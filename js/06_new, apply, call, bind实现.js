//======================================== 方法的基本介绍 ============================================/

//✅✅✅ 1. new原理介绍 (new关键字的主要作用是：执行一个构造函数，返回一个实例对象)
// 总结一下：new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象

function Person(name) {
  this.name = name;
}

let person1 = new Person("xiaoming");
let person2 = Person("xiaoHua");
console.log(person1);
console.log(person2);
//JavaScript 代码在默认情况下 `this` 的指向是 window
console.log(window.name);

/**
  new 在这个生成实例的过程中到底进行了哪些步骤来实现呢 ?

  ① 创建一个新对象
  ② 将构造函数的作用域赋给新对象（this指向新对象）
  ③ 执行构造函数中的代码（为这个新对象添加属性）
  ④ 返回新对象
 */

//如果构造函数中有`return`一个对象的操作，new 命令会直接返回这个新对象，而不是通过 new 执行步骤生成的 this 对象
//但是这里要求构造函数必须是返回一个对象，如果返回的不是对象，那么还是会按照 new 的实现步骤，返回新生成的对象

function Child(name) {
  this.name = name;
  return { age: 18 };
}
let child1 = new Child("xiaoli");
let child2 = Child("xiaohong");
let child3 = new Child("huahua");
child1.age = 20;
console.log(child1);
console.log(child2);
console.log(child3);

function Teacher(name) {
  this.name = name;
  return "tom";
}

let teacher1 = new Teacher("hhhhhh");
console.log(teacher1);
console.log(teacher1.name);

//✅✅✅ 2. apply & call & bind 原理介绍（call、apply 和 bind 是挂在 Function 对象上的三个方法，调用这三个方法的必须是一个函数）
/**
  ① 都可以改变函数`function`的`this`指向
  ② call,apply改变了函数的this指向后立即执行，而`bind`虽然改变了函数this的指向，但是并不是立即执行
  ③ apply传递的第二个参数是数组，而call，bind第二个参数到第N个参数传递的都是参数
 */

let objectA = {
  name: "jack",
  getName(msg) {
    return msg + this.name;
  },
};

let objectB = { name: "lucky" };
console.log(objectA.getName("hello~"));
console.log(objectA.getName.call(objectB, "hi_"));
console.log(objectA.getName.apply(objectB, ["hi_"]));
console.log(objectA.getName.bind(objectB, "hi_")());

//apply,call,bind使用场景
/**
  ① 判断数据类型 `Object.prototype.toString.call()`
  ② 类数组借用方法 `Array.prototype.push.call()`
  ③ 获取数组的最大值和最小值 `Math.max.apply()`
  ④ 通过call，new实现继承
 */

let arrayLike = {
  0: "java",
  1: "script",
  length: 2,
};

Array.prototype.push.call(arrayLike, "js", "objective-c");
console.log(arrayLike);

let numberArray = [1, 2, 10, 100, 50];
console.log(Math.max.apply(Math, numberArray));
console.log(Math.max(...numberArray));

//======================================== 手写new，call，bind，apply ========================================/
/*
 ✅✅✅ 1. new的实现
 ① 让实例可以访问到私有属性
 ② 让实例可以访问构造函数原型(constructor.prototype)，所在原型链上的属性
 ③ 构造函数返回的最后结果是引用数据类型
*/
function _new(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw "ctor must be a function";
  }
  // let obj = new Object();
  let obj = Object.create(ctor.prototype);
  let res = ctor.call(obj, ...args);
  let isObject = res !== null && res instanceof Object;
  let isFunction = res instanceof Function;
  return isObject || isFunction ? res : obj;
}

function Student(name, age, favorite) {
  this.name = name;
  this.age = age;
  this.favorite = favorite;
}
Student.prototype.getName = function () {
  return this.name;
};

let student1 = _new(Student, "xiaoming", 18, ["dance", "walking"]);
let student2 = _new(Student, "xiaoHong", 20, ["drawing", "teaching"]);
student2.favorite.push("runing");
console.log(student1);
console.log(student2);
console.log(student1.getName());

//✅✅✅ 2. apply和call的实现
Function.prototype.call = function (context, ...args) {
  var context = context || window;
  context.fn = this; //将`context.fn`绑定到 this(this指的是当前的函数)
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.apply = function (context, args) {
  var context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

let tmpObj = { a: "xiaoming" };
function text(mag, age) {
  return `${this.a}_${mag}_${age}`;
}
console.log(text.call(tmpObj, "呵呵呵呵呵", 18));
console.log(text.apply(tmpObj, ["runing", 20]));

//✅✅✅ 3. bind的实现
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }
  var self = this;
  var fbound = function () {
    return self.apply(this instanceof self ? this : context, args);
  };
  //原型链对象上的属性不能丢失。因此这里需要用Object.create 方法，将 this.prototype 上面的属性挂到 fbound 的原型上面
  if (this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }
  return fbound;
};

let dictA = {
  name: "xiaohong",
  age: 18,
  favorite: ["runing", "waling", "dancing"],
};
function testBind(teacher, course) {
  return `${this.name}_${this.age}_${this.favorite}---${teacher}---${course}`;
}
let bindMethod = testBind.bind(dictA, "李宁", "高数");
console.log(bindMethod());
