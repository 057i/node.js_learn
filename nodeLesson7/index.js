// var http=require('http');
// var url=require('url')//用于解析parse
// var globalConf = require("./config")
//
// http.createServer(function (request,response) {
//     // console.log(request.url)
//     var parthname=url.parse(request.url).pathname;//直接解析出路由地址
//     var params=url.parse(request.url).query//get方式请求的参数，把参数解析成字符串
//     var params1=url.parse(request.url,true).query//get方式请求的参数，把参数解析成对象（kv）
//
//     console.log(globalConf["port"])
//     console.log(params)
//     console.log(params1,params1.a)
//
// }).listen(globalConf["port"])




//
var http = require('http');//只能用于解析协议，对于文件，解析不了；所以要用express解析
var url = require('url')//用于解析parse
var globalConf = require("./config")
var fs = require("fs")
var loader = require("./loader")//处理动态获取数据的
var log = require("./log")//日志文件
var filterSet = require("./filterLoader")//过滤器配置

//开启服务
http.createServer(function (request, response) {
    console.log(123456)
    var pathname = url.parse(request.url).pathname;//直接解析出路由地址
    var params = url.parse(request.url, true).query//get方式请求的参数，把参数解析成对象（kv）
    var isStatic = isStaticsRequest(pathname)
    log(pathname)

    //在所有过程开始之前，执行过滤器
    for (var i = 0; i < filterSet.length; i++) {
        console.log(filterSet[i])
        var flag = filterSet[i](request, response)
        //不通过过滤器，下面的代码不执行
        if (!flag) {
            return
        }
    }


    //判断如果是静态文件的话
    if (isStatic) {

        //因为nodejs运行为单线程，如果异常出错会阻塞关闭服务
        //所以将执行代码放到try...catch里面写
        try {
            var dateFile = fs.readFileSync(globalConf["page_path"] + pathname);
            //写请求头
            response.writeHead(200)
            response.write(dateFile)
            response.end()

        } catch (e) {
            response.writeHead(404)
            response.write("<html><body><h1>404 NotFound</h1></body></html>")
            response.end()
        }
    } else {
        // 如果是动态文件的话
        if (loader.get(pathname) != null) {//已经注册过该获取数据函数了

            try {
                console.log(loader.get(pathname))
                loader.get(pathname)(request, response)//执行就好

            } catch (e) {
                //万一服务器程序执行时候出错，服务器端错误500
                response.writeHead(500)
                response.write("<html><body><h1>500 BadServer</h1></body></html>")
                response.end()
            }
        } else {
            response.writeHead(404)
            response.write("<html><body><h1>404 NotFound</h1></body></html>")
            response.end()
        }

    }


}).listen(globalConf["port"])
log("服务已启动")

function isStaticsRequest(pathname) {
    for (var i = 0; i < globalConf.static_file_type.length; i++) {
        var temp = globalConf.static_file_type[i]
        if (pathname.indexOf(temp) == pathname.length - temp.length) {//判断是不是以静态资源结尾
            return true
        }
    }
}
