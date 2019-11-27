var fs = require("fs");
var globalConf = require("./config");//读取全局配置
var filterSet = [];
var file = fs.readdirSync(globalConf["filter_path"])//读取过滤器文件

for (var i = 0; i < file.length; i++) {
    var temp = require("./" + globalConf["filter_path"] + "/" + file[i]);
    filterSet.push(temp)
}
//导出过滤器配置文件
module.exports = filterSet
