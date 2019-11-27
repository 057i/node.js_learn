var studentDao = require("../dao/studentDao")

function queryAllStudent() {
    studentDao.queryAllStudent()
}

function queryStudentBySno(sno, success) {

    studentDao.queryStudentBySno(sno, success)
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentBySno": queryStudentBySno
}
