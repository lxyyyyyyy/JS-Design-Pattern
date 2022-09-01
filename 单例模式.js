//单例模式：保证一个类中仅有一个实例，并且提供一个全局访问点能够访问到
//定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
//例如windows回收站、任务管理器。每次只能打开一个。
//应用场景，每次点击登录按钮，不论点击多少次，只会出现一个登录弹窗
//防抖函数每次只设置一个定时器

//使用静态class实现单例模式
class SingleClass {
    constructor(name, creator, products) {
        this.name = name;
        this.creator = creator;
        this.products = products;
    }
    //通过静态类创建唯一的实例
    static getInstance(name, creator, products) {
        if (!this.instance) {
            this.instance = new SingleClass(name, creator, products)
        }
        return this.instance
    }
}
//通过instance创建实例，整个类只能被创建一个实例。
let apple = SingleClass.getInstance('apple', 'a', 'iphone');
let copy = SingleClass.getInstance('applecopy', 'b', 'bphone');
console.log(apple, copy)


//通过闭包实现单例模式
    //实现单例模式:通过闭包实现
    function Single(fn) {
        //闭包存储结果，下次调用时仍然保存在内存中，所以可以进行判断
        let res = null
        return function () {
            //如果没有res，就res=fn（），如果有就返回res
            return res == null ? (res = fn()) : res;
        } 
    }
    //函数：生成一个登陆弹窗
    function createLogin() {
        let div = document.createElement('div');
        div.innerHTML = '这是一个登陆弹窗，只出现一次';
        div.style.display = 'none';
        document.body.append(div);
        return div;
    }
    //将函数用Single包裹，使得这个函数只能生成一次
    console.log(Single(createLogin))


    //通过一个外部变量控制全局只有一个Vue实例
    //在安装插件时每次只能安装一次，install方法中，设置如果已经有Vue或者有值，就不重新创建实例
   /*  let Vue
    export function install(_Vue){
        if(Vue && _Vue === Vue){
            return
        } 
    } 
    Vue = _Vue
    applyMixin(Vue)
    */