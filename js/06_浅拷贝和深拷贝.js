//-----------------------------1. 浅拷贝 ----------------------------------/
//浅拷贝定义：将一个对象的属性拷贝到新的对象中，当属性值是基本数据类型，就将基本类型的值复制给新对象。如果属性值是引用数据类型，复制的就是内存中的地址

// 方法一: 使用Object.assign
/** ① 可以拷贝symbol类型的属性 ② 不会拷贝对象的继承属性  ③ 不会拷贝对象的不可枚举属性 */
let tmpA = {
  name: "小明",
  age: 19,
  sym: Symbol("1"),
  jobs: {
    first: "医生",
    second: "老师",
  },
  sayHello: function () {},
};
Object.defineProperty(tmpA, "innumerable", {
  value: "不可枚举属性",
  enumerable: false,
});
let tmpB = Object.assign({}, tmpA);
tmpA.name = "小红";
tmpA.jobs.first = "司机";
console.log(tmpA);
console.log(tmpB);
console.log("------------------------------------------------");

// 方法二:使用扩展运算符 ... 实现浅拷贝
let B = {
  name: "李宁",
  jobs: {
    first: "跳远",
    second: "举重",
  },
};
let D = { ...B };
B.name = "黎明";
B.jobs.first = "跑步";
console.log(B);
console.log(D);

let tmpAarray = [1, 2, { a: 5 }];
let tmpBarray = [...tmpAarray];
tmpAarray[0] = 10;
tmpAarray[2].a = 100;
console.log(tmpAarray);
console.log(tmpBarray);
console.log("------------------------------------------------");

// 方法三: 数组的concat
let arrayA = [1, 2, { paragram: 3 }];
let arrayB = arrayA.concat();
arrayA[2].paragram = 4;
console.log(arrayA);
console.log(arrayB);
console.log("------------------------------------------------");

// 方法四: 数组的slice
let arrayC = [4, 5, { a: 6 }];
let arrayD = arrayC.slice();
arrayC[2].a = 7;
console.log(arrayC);
console.log(arrayD);
console.log("------------------------------------------------");

//✅✅手动实现一个浅拷贝
const shallowClone = (target) => {
  if (typeof target === "object" && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

let normalObj = {
  name: "小明",
  age: 18,
  favorites: { first: "dance", second: "draw" },
};
let cloneObj = shallowClone(normalObj);
cloneObj.name = "小红";
cloneObj.favorites.first = "swiping";
console.log(normalObj);
console.log(cloneObj);

let targrtArray = ["小红", "小明", "小花"];
let cloneArray = shallowClone(targrtArray);
console.log(cloneArray);

//-----------------------------2. 深拷贝 ----------------------------------/
// 方法一: 使用`JSON.parse(JSON.stringify(Object))`
/**
  ① 当对象的属性值中有函数, symbol, underfined 这几种数据类型，经过JSON.stringify序列化后的字符串这个键值对会消失
  ② 拷贝 Date 引用类型会变成字符串
  ③ 无法拷贝不可枚举的类型
  ④ 无法拷贝对象的原型链
  ⑤ 拷贝 RegExp 引用对象类型时会变成空对象{}
  ⑥ 对象中含有 NaN,Infinity 以及 -Infinity，JSON序列化的结果会变成null
  ⑦ 无法拷贝对象的循环引用，即对象成环（ obj[key] = obj ）
 */
let person1 = {
  name: "小花",
  age: 18,
  height: undefined,
  uniqueTag: Symbol.for("unique"),
  other: null,
  date: new Date(),
  reg: /\.css/,
  nan: NaN,
  infinity: Infinity,
  favorite: ["唱歌", "跳舞", "吉他"],
  jobs: {
    first: "teacher",
  },
  greeting: function () {
    console.log(`我是${this.name}`);
  },
};
Object.defineProperty(person1, "unenable", {
  value: "我是不可枚举属性",
  enumerable: false,
});
let tmpDictB = JSON.parse(JSON.stringify(person1));
person1.name = "小明";
person1.jobs.first = "厨师";
person1.favorite[0] = "绘画";
person1.greeting();
console.log(person1);
console.log(tmpDictB);
console.log("------------------------------------------------");

// 方法二: 基础版本（手动递归实现）
function deepClone(obj) {
  let cloneObj = {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key]);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}

let coment = Symbol.for("coment");
let objA = {
  a: "xiaoHong",
  [coment]: "coment",
  date: new Date(),
  b: {
    first: "18",
    second: "20",
    c: {
      one: "dance",
      two: "draw",
    },
  },
};
let objB = deepClone(objA);
objA.b.first = "first_19";
objA.b.c.one = "画画";
console.log(objA);
console.log(objB);
console.log("------------------------------------------------");

// 方法三: 改进版本 (改进后的递归实现)
/**
  ① 针对对象的不可枚举属性和`Symbol`类型，可以使用`Reflect.ownKeys`
  ② 当参数为Date,RegExp 则直接生成一个实例返回
  ③ 利用对象的`getOwnPropertyDescriptors`可以获取对象的所有属性，结合`Object.create`方法创建一个新对象，并继承原对象的原型链
  ④ 利用`weakMap`类型作为 Hash表，因为`weakMap`是弱引用类型，可以有效防止内存泄漏 (map 和 weakMap的区别 ？)
 */

const isComplexDataType = (obj) => {
  if ((typeof obj === "object" || typeof obj === "function") && obj !== null) {
    return true;
  } else {
    return false;
  }
};

/**
 * 自己写的深拷贝 (面试的时候写，不要轻易写下面那个深拷贝`WeakMap`不理解)
 */
const normalDeepClone = function (obj) {
  //获取一个对象的所有自身属性的描述符
  let allDes = Object.getOwnPropertyDescriptors(obj);
  //使用现有对象来创建新对象的原型__proto__，第二个参数，传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes);
  for (const key of Reflect.ownKeys(obj)) {
    const element = obj[key];
    if (isComplexDataType(element) && typeof element !== "function") {
      if (element.constructor === Date) {
        cloneObj[key] = new Date(element);
      } else if (element.constructor === RegExp) {
        cloneObj[key] = new RegExp(element);
      } else {
        cloneObj[key] = normalDeepClone(obj[key]);
      }
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};

/**
 * 完整版深拷贝 (`WeakMap`循环引用还不理解)
 */
const advanceDeepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj);
  }
  if (obj.constructor === RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  //继承原型链
  hash.set(obj, cloneObj);
  for (const key of Reflect.ownKeys(obj)) {
    if (isComplexDataType(obj[key]) && typeof obj[key] !== "function") {
      cloneObj[key] = advanceDeepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};

let tmpObjA = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date("2020-10-10 10:10:10"),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};
Object.defineProperty(tmpObjA, "innumerable", {
  value: "不可枚举属性",
  enumerable: false,
});
Object.setPrototypeOf(tmpObjA, new Date());
// tmpObjA.loop = tmpObjA; // 设置loop成循环引用的属性
let cloneObjA = normalDeepClone(tmpObjA);
tmpObjA.obj.name = "我是小明";
console.log(tmpObjA);
console.log(cloneObjA);
