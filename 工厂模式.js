//设计模式是一个抽象的概念，是软件开发过程中面临的一般问题的解决方案。

//工厂模式：是用来创建对象的一种常见的设计模式，不暴露创建对象的具体逻辑，
//而是将逻辑封装在一个函数中，那么这个函数可以视为一个工厂
//简单工厂模式
//只需要在工厂函数中传入一个options，即可生成所需要的实例
function Animal(options) {
    let obj = {};
    obj.color = options.color;
    obj.name = options.name;
    obj.getInfo = function () {
        return 'name :' + obj.name + ',color:' + obj.color;
    }
    return obj
}
let cat = Animal({ name: '小猫', color: 'white' });
console.log(cat.getInfo())

//工厂方法模式
//定义一个抽象类，只用于子类的继承
class User {
    constructor(name = '', viewPage = '') {
        //通过new.target检测User是否通过new关键字被调用
        if (new.target === User) {
            throw new Error('抽象类不能实例化')
        }
        this.name = name;
        this.viewPage = viewPage;
    }
}
//定义一个实例化对象的工厂，只用于实例化对象
class UserFactory extends User {
    //继承抽象类中的参数
    constructor(name, viewPage) {
        super(name, viewPage)
    }
    //一个创建实例的方法，通过传入的不同参数创建不同的实例
    create(role) {
        switch (role) {
            case 'superAdmin':
                return new UserFactory('超级管理员', ['首页', '通讯录', '发现', '应用数据'])
            case 'admin':
                return new UserFactory('普通管理员', ['首页', '通讯录', '发现'])
            case 'user':
                return new UserFactory('普通用户', ['首页', '发现'])
            default:
                throw new Error('参数错误,可选参数:superAdmin,admin,user')

        }
    }
}
//通过工厂方法创建实例
let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
console.log(superAdmin)

//抽象工厂模式：不直接生成实例，而是用于对产品类的创建
function getAbstractUserFactory(type) {
    switch (type) {
        case 'wechat':
            return UserOfWechat;
        case 'QQ':
            return UserOfQQ;
        case 'weibo':
            return UserOfWeibo;
        default:
            throw new Error('参数错误')
    }
}
//生成不同的产品类
let WechatUserClass = getAbstractUserFactory('wechat')
let QQUserClass = getAbstractUserFactory('QQ');

//不同的用户实例
let wechatUser = new WechatUserClass('user1');
