//一个请求一个方法,一个方法一个文件

var path = new Map()
var url = require("url")
var studentService = require("../service/studentService")

function getDate(request, response) {
    // console.log(request, response)

}

//因为是请求服务器地址，所以参数是request和response
function login(request, response) {
    //传参规格化
    request.on("data", function (data) {
        
        var paramArr = data.toString().split("&")
        var params = {};
        paramArr.forEach(function (ele, index) {
            var temp = ele.split("=")
            params[temp[0]] = temp[1]
        })


//调用连接数据库查询
        studentService.queryStudentBySno(params.stuNum, function (result) {
            var res = ""
            if (result[0].pwd == params.password) {//返回回来的查询是一个数组

                response.writeHead(302,{"location":"/main.html","Set-Cookie":"id="+params.stuNum})//后端重定向.并且设置cookie

            } else {
                // res = "fail"
                response.writeHead(302,{"location":"/error.html"})
            }
            // response.write(res)
            response.end()//结束响应体
        })


    })

}

path.set("/getDate", getDate)
path.set("/login", login)


module.exports.path = path
