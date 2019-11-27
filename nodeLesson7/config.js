//全局配置
var fs = require("fs");

var conf = fs.readFileSync("./server.conf")//导入server.conf进行全局配置文件的读取


var globalConf = {}
var configArr = conf.toString().split('\r\n');//拆分全局配置文件每一行

//循环每一行把每一行都封装到一个大对象的kv里面去
for (var i = 0; i < configArr.length; i++) {
    var tempConf = configArr[i].split('=');
    if (tempConf.length < 2) {
        continue
    } else {
        globalConf[tempConf[0]] = tempConf[1]
    }
}
//拆分静态文件后缀的字符串，如果没有则报错
try{
    globalConf.static_file_type = globalConf.static_file_type.split("|");
}catch(e){
    //nodejs主程序只运行在一个线程里，出错全部停止
    throw new Error("配置文件异常，缺少static_file_type")
}


module.exports = globalConf
