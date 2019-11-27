var net = require('net');
var fs = require('fs');
var globalConf = require('./conf');//导入自定义模块

var server = net.createServer();
server.listen(globalConf.port, "127.0.0.1")

server.on("listening", function () {
    console.log("服务已启动")
})

//有连接之后
server.on("connection", function (socket) {
    socket.on("data", function (data) {

        var url = data.toString().split("\r\n")[0].split(" ")[1];

        console.log(globalConf.basePath.trim()+ url)  //这里为什么拼接不上，会覆盖？？？
                                                    //因为conf里面每个后面有一个\r，
                                                    // 这个是\r代表的是回车符 就相当于换行光标置到最前面
                                                    // 然后两个路径相加 就会出现覆盖的现象
        try {

            var dataFile = fs.readFileSync(globalConf["basePath"].trim()+ url)
            console.log(dataFile)
            // socket.write("HTTP 200OK\r\nContent-type:text/html\r\nServer:DWS/1.1\r\n\r\n<html><body>hello browser</body></html>");
            socket.write("HTTP 200OK\r\n\r\n")
            //这里要回车换行各2个，因为请求头两个，响应头两个，然后拼接文档内容
            socket.write(dataFile);
        } catch (e) {
            socket.write("HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>");
        }
        socket.end();

    })

})

