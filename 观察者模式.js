//观察者模式
//定义了对象间一对多的依赖关系，当目标对象的状态发生改变时，
//所有依赖它的对象都会得到通知

//vue发布订阅模式中的收集依赖，通知更新就是基于观察者模式实现的


//被观察者，目标类
class Subject{
    //向被观察者身上添加一个观察者数组
    constructor(){
        this.observers = []
    }
    //用于向观察者数组中添加观察者
    add(observer){
        this.observers.push(observer)

    }
    //用于从观察者数组中移除观察者
    remove(observer){
        const index = this.observers.findIndex(o=>o.name === observer.name)
        this.observers.splice(index,1);
    }
    //通知，执行所有observes的update方法
    notify(){
        const observers = this.observers;
        observers.forEach(observer=>{
            observer.update()
        })

    }
}
//观察者类
class Observer{
    constructor(name){
        this.name = name;
    }
    update(){
        console.log('去更新视图了啦~')
    }
}

//创建一个被观察者对象
let sub = new Subject()
let observer1= new Observer('lxy');
let observer2 = new Observer('hsh');
sub.add(observer1)
sub.add(observer2)
sub.notify()