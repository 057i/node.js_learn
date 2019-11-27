//配置文件夹
var fs = require('fs');

//加载配置文件
var globalConf = {}
var conf = fs.readFileSync("server.conf");//异步读取文件
var confs = conf.toString().split('\n');//换行拆分
for (var i = 0; i < confs.length; i++) {
    var tempConf = confs[i].split('=');
    if (tempConf.length < 2) {
        //没有某一项数据的情况下,结束本轮循环
        continue
    } else {
        globalConf[tempConf[0]] = tempConf[1]
    }
}
//判断是绝对路径还是相对路径
console.log(globalConf["path_position"]== "relative")
if (globalConf["path_position"] != "relative") {
    globalConf.basePath =__dirname+globalConf.path
} else {
    globalConf.basePath =globalConf.path
}
module.exports = globalConf//导出
