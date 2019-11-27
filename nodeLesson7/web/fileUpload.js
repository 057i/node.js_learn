var fs = require("fs");
var path = new Map();

function testFileUpload(request, response) {
    // console.log(request)
    request.on("data", function (data) {
        // console.log(data)//文件的二进制格式
        var fis = fs.createWriteStream("./file/po.png")//对文件流进行写入
        fis.write(data);
        fis.end()
        response.end()


    })
}

path.set("/testFileUpload", testFileUpload)
module.exports.path = path
