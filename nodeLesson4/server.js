//服务器端
var net=require('net');
//创建服务
var server=net.createServer()
//服务监听
server.listen(12305,'127.0.0.1')

//server有四种事件
//listening,connection,close,error，用on绑定
//三种方法，listen，close,address，其中address()只能在回调函数里面找得到


//正在监听（常用）
server.on('listening',function () {
    console.log('正在监听',server.address())
})

//连接事件（常用）
server.on('connection',function (socket) {
    console.log('有新用户连接')
    socket.on('data',function (data) {
        console.log(data.toString())
        socket.write("HTTP 200OK\r\nContent-type:text/html\r\nServer:DWS/1.1\r\n\r\n<html><body>hello browser</body></html>");
        //拼接响应头到网页做相应页面（重点）
    })

})
//关闭服务事件
server.on('close',function () {
    console.log('关闭后端服务')
})
//服务错误事件
server.on('error',function () {
    console.log('后端服务出错')
})






