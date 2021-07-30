// 继承的概念:
// 继承可以使得子类别具有父类的各种方法和属性
// 继承是面向对象的,可以更好地复用以前的开发代码，缩短开发的周期、提升开发效率

//------------------------------ 第一种：原型链继承 ---------------------------------------/
//缺点: 因为两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化
function Parent1() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}

function Children1() {
  this.type = "children1";
}

Children1.prototype = new Parent1();
let parent1 = new Parent1();
let s1 = new Children1();
let s2 = new Children1();
Object.getPrototypeOf(s1).name = "hhhh";
s1.play.push(4);
s2.play.push(5);
console.log(parent1);
console.log(s1);
console.log(s2);
console.log(s1.play);
console.log(s2.play);
console.log("--------------");

//------------------------ 第二种：构造函数继承（借助 call） -----------------------------/
//缺点: 只能继承父类的实例属性和方法，不能继承原型属性或者方法
function Parent2() {
  this.name = "parent2";
  this.greeting = function () {
    return "woshigreeting";
  };
}

Parent2.prototype.getName = function () {
  return this.name;
};

function Child2() {
  Parent2.call(this);
  this.type = "child2";
}

let s3 = new Child2();
console.log(s3);
console.log(s3.greeting());
// console.log(s3.getName());
console.log("--------------");

//--------------------------- 第三种：组合继承（前两种组合） --------------------------------/
//缺点: 第一次是改变Child3 的 prototype 的时候，第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3(type) {
  Parent3.call(this);
  this.type = type;
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
// 前面改变了prototype，需要重新挂一下
Child3.prototype.constructor = Child3;
let s4 = new Child3("type1");
let s5 = new Child3("type2");
s4.play.push(4);
console.log(s4);
console.log(s5);
console.log(s4.play);
console.log(s5.play);
console.log(s4.getName());
console.log(s5.getName());
console.log("--------------");

//--------------------------------- 第四种：原型式继承 -----------------------------------/
//缺点: 多个实例的引用类型属性指向相同的内存
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("lucky");

let person5 = Object.create(parent4);
person5.friends.push("jerry");

console.log(person4);
console.log(person5);
console.log(person4.friends);
console.log(person5.friends);
console.log("--------------");

//--------------------------------- 第五种：寄生式继承 -----------------------------------/
//寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person6 = clone(parent5);

console.log(person6.getName());
console.log(person6.getFriends());
console.log("--------------");

//--------------------------------- 第六种：寄生组合式继承 -----------------------------------/
//同时也减少了构造次数，减少了性能的开销
function Parent6(name, favorites) {
  this.name = name;
  this.favorites = favorites;
}
Parent6.prototype.getName = function () {
  return this.name;
};
Parent6.prototype.getFavorites = function () {
  return this.favorites;
};
function Child6(name, favorites, friends) {
  Parent6.call(this, name, favorites);
  this.friends = friends;
}
Child6.prototype = Object.create(Parent6.prototype);
Child6.prototype.constructor = Child6;

Child6.prototype.getFriends = function () {
  return this.friends;
};

let person7 = new Child6("xiaoming", ["dance", "playing"], "小花");
let person8 = new Child6("lining", ["draw", "walking"], "小红");
console.log(person7);
console.log(person8);
console.log(person7 instanceof Parent6);
console.log("--------------");

//--------------------------------- ES6 的 extends 关键字实现逻辑-----------------------------------/
//ES6的`extends` 采用的是寄生组合式继承方式
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greeting() {
    return `我是${this.name}`;
  }
  playing() {
    return `我的年龄是${this.age}`;
  }
}

class Teacher extends Person {
  constructor(name, age, courses) {
    super(name, age);
    this.course = courses;
  }
  teaching() {
    return `我教授的科目是${this.courses}`;
  }
  greeting() {
    return `我是老师${this.name}`;
  }
}

let normalPerson = new Person("小丽", 18);
let teacher1 = new Teacher("小明", 20, ["语文", "数学"]);
let teacher2 = new Teacher("小花", 30, ["体育", "英语"]);
console.log(normalPerson);
console.log(teacher1);
console.log(teacher2);
console.log(teacher1.constructor === Teacher);
