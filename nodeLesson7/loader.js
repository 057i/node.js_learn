//动态获取数据时候，拼接每个路由同名文件下的获取数据函数
//做成映射关系，每个路由同名文件处理函数不能重复
//专门加载controller的
var fs = require("fs")
var globalConfig = require("./config")
var controllerSet = [];
var pathMap = new Map() //做一个全局业务逻辑映射
var files = fs.readdirSync(globalConfig["web_path"])//读取目录

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i])//引入自定义的模块需要前面补上路径

    if (temp.path) {
        //遍历导出每个文件所对应的代码，做映射
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                throw new Error("url path异常,url:" + key)
            }
            controllerSet.push(temp)
        }
    }

}

module.exports = pathMap
