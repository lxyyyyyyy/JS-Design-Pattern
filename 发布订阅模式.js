//发布订阅模式
//实现了对象间多对多的依赖关系，通过事件中心管理多个事件。
//目标对象不会直接通知观察者，而是通过事件中心派发通知
//$on('事件名'，fn(){回调函数})，意思是如果接收到了'事件名'，就执行回调函数
//$emit('事件名')，传递一个''事件'
//$off('事件名')，移除这个事件
class Observer {
    constructor() {
        //一个消息队列，对象
        this.message = {}

    }
    //on方法接收一个事件名，一个回调函数，并且往消息队列中添加属性名为事件名，属性值为由回调函数组成的数组
    $on(type, fn) {
        //如果消息队列中有type事件名，就向里面添加事件
        //如果消息队列中没有事件名，就初始化一个数组
        if (!this.message[type]) {
            this.message[type] = [fn]
        } else {
            this.message[type].push(fn);
        }
    }
    $off(type, fn) {
        //如果没有type，return
        if (!this.message[type]) return
        //如果有type,没有fn，直接删除整个事件
        if (!fn) {
            this.message[type] = undefined;
            return
        }
        //如果有type，有fn，就只删除一个fn
        this.message[type] = this.message[type].filter((item) => item !== fn)
    }
    $emit(type, ...args) {
        //遍历消息队列，然后执行每一项
        //判断有没有
        if (!this.message[type]) return
        this.message[type].forEach(element => {
            element(...args);
        });
    }
    $once(type, fn) {
        function cb() {
            fn();
            this.$off(type, cb)
        }
        this.$on(type, cb);
    }
}

//实例化一个观察者
let person = new Observer();
//向这个观察者委托事件
person.$on('寻找hsh', handlerB);
person.$on('叫hsh来', handlerA);
//向这个观察者移除事件,两种方式，一种是删除整个事件，第二种是删除其中一个回调
// person.$off('叫hsh来');
// person.$off('叫hsh来',handlerA)

//$emit('事件') 执行消息队列中的事件
person.$emit('寻找hsh', '咦?')
person.$emit('寻找hsh', '咦咦咦?')
person.$emit('叫hsh来', '啊！')


function handlerA(a) {
    console.log(a + 'hsh来啦')
}
function handlerB(b) {
    console.log(b + 'hsh呢')
}
console.log(person)