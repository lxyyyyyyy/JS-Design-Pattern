//适配器模式：用于解决两个接口不兼容的情况
//这种情况下，不需要改变已有的接口，而是通过给接口包装一层的方法实现两个接口的兼容
//已有的地图接口
//可以看到地图的两个渲染方法不一样，一个是能用show调用，一个只能用display
let googleMap = {
    show(){
        console.log('开始渲染谷歌地图')
    }
}
let baiduMap = {
    display(){
        console.log('开始渲染谷歌地图')
    }
}
//已有的渲染接口
function renderMap(map){
    if(map.show instanceof Function){
        map.show();
    }
}
renderMap(baiduMap);
//不能通过渲染接口调用baiduMap
renderMap(googleMap)
//在不改变地图接口的情况下，可以增加一个baiduMap的适配器接口
let baiduMapAdapter = {
    show(){
        return baiduMap.display();
    }
}
//这样就可以通过rendermap调用两个接口了