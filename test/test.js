var html=require("http")
function hello(req,res) {
    res.writeHead(200,{"Content-Type":"text/plain"})
    res.end('hello,world')
}
http.createServer(hello).listen(12306,"192.168.199.175")
console.log('hello,world')
