//装饰模式不需要改变已有的接口，实现给对象添加额外的功能。
//使用ES7中的装饰器语法实现
function readonly(target,key,descriptor){
    descriptor.writable = false
    return descriptor;
}
class Test{
    @readonly
    name = 'lxy'
}
let t = new Test()
t.name = '111'
