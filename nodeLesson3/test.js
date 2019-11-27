// nodejs的本质是运行在一个函数是上
function xyz(exports,require,module,__filename,__dirname) {

    //这里开始写自己写的nodejs代码
    //..............
    //自己写的nodejs代码结束

    console.log(require)
    return module.exports
}
