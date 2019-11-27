//日志文件,和系统运行完全无关，所以尽量都用异步
var fs=require("fs");
var globalConfig=require("./config")

var fileName=globalConfig["log_path"]+globalConfig["log_name"]

// fs.writeFileSync(fileName,"bsd")

function log(data) {

    //异步写入有回调函数，同步没有
    fs.writeFile(fileName,data+"\n",{flag:"a"},function () {
        console.log("finish")
    })
}
module.exports=log
