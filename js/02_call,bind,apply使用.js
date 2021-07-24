//1.-----------call的使用-------------
var a = "我是window的小a";
let b = "我是b参数";
var obj = {
  a: "我是obj的小a",
  foo: function (...arg) {
    console.log(this.a, this, ...arg);
  },
};

var f2 = obj.foo;
f2(); //this的指向是window
obj.foo(); //this的指向是obj

var foods = "香蕉";
let foodObj = {
  foods: "西红柿",
};
function eating() {
  console.log(`正在吃-${this.foods}`);
}

eating.call();
eating.call(window);
eating.call(foodObj);

//2.---------apply的使用--------------
//①将数组各项添加到另一个数组，concat是重新创建一个新的数组，可以使用apply添加到现有数组中
let currentArray = ["a", "b"];
let elements = [1, 2, 3];
currentArray.push.apply(currentArray, elements);
console.log(currentArray);

//②使用apply和内置函数
let numbers = [2, 5, 10, 7, 6];
console.log(Math.max(...numbers));
console.log(Math.max.apply(null, numbers));

//3.---------bind的使用----------------
this.x = 9;
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};
let getMethod = module.getX.bind(module);
console.log(module.getX());
console.log(getMethod());
