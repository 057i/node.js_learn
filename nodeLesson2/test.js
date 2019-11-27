// //当module.exports和exports指向同一个对象时候，module.exports==exports，导出的是同一个对象
// var a=[1,2,3,4,5]
// var b=5
// module.exports.a=a
// exports.a=b
// // /*console.log({}=={})
// console.log(module.exports==exports)


//当module.exports和exports指向不同一个对象时候，module.exports！=exports，导出的是module.exports
var a=[1,2,3,4,5]
var b=5
module.exports=a
exports=b;
console.log(module.exports==exports)
