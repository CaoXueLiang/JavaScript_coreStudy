/**
  ① `typeof`判断基本数据类型
  ② `instanceof`判断引用数据类型
  ③ `Object.prototype.toString.call()` 判断数据类型
 */

console.log(typeof null);
console.log(typeof 100);
console.log(typeof "字符串");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof Symbol(""));
console.log("---------------------------------");

//1. `typeof`和`instanceof`相结合判断类型
function getType(paragram) {
  if (typeof paragram === "object") {
    if (paragram == null) {
      return "null";
    } else if (paragram instanceof Array) {
      return "array";
    } else if (paragram instanceof Function) {
      return "function";
    } else if (paragram instanceof Date) {
      return "date";
    } else if (paragram instanceof RegExp) {
      return "regexp";
    } else if (paragram instanceof Object) {
      return "object";
    }
  } else {
    return typeof paragram;
  }
}

let tmpArray = [1, 2, 3];
function myFunction() {}
let myObject = {};
console.log(getType(null));
console.log(getType(tmpArray));
console.log(getType(myFunction));
console.log(getType(myObject));
console.log(getType("我是字符串"));
console.log(getType(Symbol()));
console.log("---------------------------------");

//2. Object.prototype.toString.call()`判断数据类型
function getCustomType(obj) {
  return Object.prototype.toString.call(obj);
}

console.log(getCustomType([1, 2, 3]));
console.log("---------------------------------");

//3. 手写`instanceof`的实现

/*instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，
如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例*/

function customInstance_of(leftValue, rightValue) {
  let rightproto = rightValue.prototype;
  let leftProto = leftValue.__proto__;
  while (true) {
    if (leftProto === null) {
      return false;
    }
    if (leftProto === rightproto) {
      return true;
    }
    leftProto = leftProto.__proto__;
  }
}

let normalArray = ["a", "b", "c", "d"];
let customFunction = () => {
  console.log("我是一个函数");
};
console.log(customInstance_of(normalArray, Array));
console.log(customInstance_of(customFunction, Function));
