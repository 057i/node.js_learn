// var fs = require("fs");
var url = require("url");
var globalConf =require("../config.js")

//登录拦截
    function loginFilter(request, response) {
        var pathname = url.parse(request.url).pathname

        //判断条件：页面中是登录页面或者是访问的是静态页面的时候不拦截
        if (pathname == "/login.html" || pathname == "/login" || isStaticsRequest(pathname)) {
            return true
        }

        //判断条件：页面中已经登录的时候（即页面中的id存在的时候，不拦截）
        if (request.headers.cookie) {
            console.log(request.headers.cookie)
            var cookieArray = request.headers.cookie.split(";")
            console.log()
            for (var i = 0; i < cookieArray.length; i++) {

                var temp = cookieArray[i].split("=");
                if (temp[0] == "id") {
                    return true
                }
            }
        }

        //否则后端路由重定向到登录页面，不允许访问其他页面
        response.writeHead(302, {"location": "/login.html"})
        response.end()
        console.log("456789522")
        return false
    }

//判断是否为静态文件
function isStaticsRequest(pathname) {
    for (var i = 0; i < globalConf.static_file_type.length; i++) {
        var temp = globalConf.static_file_type[i]

        if (temp == ".html") {
            continue
        }
        if (pathname.indexOf(temp) == pathname.length - temp.length) {//判断是不是以静态资源结尾
            return true
        }
    }
}


module.exports = loginFilter
