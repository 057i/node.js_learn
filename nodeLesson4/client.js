var net=require('net');
//创建与某地址某端口的连接
var socket=net.connect(12305,'127.0.0.1')
socket.write('hello,server')//向服务器传输数据
socket.on('data',function (data) {//监听事件
    console.log(data.toString())
})
