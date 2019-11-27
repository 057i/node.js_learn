var mysql=require("mysql")
//导出一个函数。每次连接每次生成一个新的
function createConnection() {
    return mysql.createConnection({
        host:'127.0.0.1',
        port:"3306",
        user:"root",
        password:"lwq4988441",
        database:"school"//要使用哪个数据库
    })
}


    //要注意的是一个dao文件对应一个表的操作
    // 导出全局连接操作
module.exports.createConnection=createConnection
