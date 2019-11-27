var dbUtil = require("./dbUtil")


function queryAllStudent() {
    var connection = dbUtil.createConnection()
    //操作之前要先连接，操作完成后要关闭连接，不关闭会很占用资源
    connection.connect()//连接

    var querySql = "select * from student";
    connection.query(querySql, function (error, result) {
        if (error == null) {
            console.log(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}


function queryStudentByClassAndAge(classNum, age) {
    //每次进来生成一个唯一的connect，这样就不会点击两次的时候报错了
    var connection = dbUtil.createConnection()
    connection.connect();//查询之前先连接
    //不能直接将传过来的参数拼接到查询字段，防止sql注入
    var queryStr = "select * from student where class = ? and age = ?";
    connection.query(queryStr, [classNum, age], function (error, result) {
        if (error == null) {
            console.log(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}

function queryStudentBySno(sno, success) {
    var connection = dbUtil.createConnection()
    var queryStr = "select * from student where stu_num=?";
    connection.connect();
    connection.query(queryStr, sno, function (error, result) {
        console.log(error, result)
        if (error == null) {
            success(result)
        } else {
            console.log(1, error)
        }
    })
    connection.end();

}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge,
    "queryStudentBySno": queryStudentBySno
}


