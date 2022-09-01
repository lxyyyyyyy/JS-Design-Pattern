//代理模式
//一个对象不适合直接引用另一个对象，代理对象可以在两个对象之间起到中介的作用



//ES6利用Proxy在目标对象之前架设一层拦截，访问对象的时候触发getter，修改对象的时候触发setter
let obj = {
    lxy:'lxy',
    hsh:'hsh',
}
let p = new Proxy(obj,{
    get(target,key,receiver){
        console.log(`访问到${key},${target}`);
        return Reflect.get(target,key,receiver)
    },
    set(target,key,value){
        console.log(`修改了${target},${key},${value}`)
        return Reflect.set(target,key,value)
    },
    deleteProperty(target,key){
        console.log('删除了'+target,key)
        return Reflect.deleteProperty(target,key)
    }
})
p.lxy
p.hsh = 'pig'
delete p.hsh
console.log(obj)
