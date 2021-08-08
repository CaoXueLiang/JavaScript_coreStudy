/**
 JavaScript 中有哪些情况下的对象是类数组呢？
  1.函数里面的参数对象 arguments；
  2.用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection ---  (DOM 元素集合)；
  3.用 querySelector 获得的 NodeList --- (NodeList 对象是节点的集合)。
 */

function foo(name, age, sex) {
  console.log(arguments);
  console.log(typeof arguments);
  console.log(Object.prototype.toString.call(arguments));
  console.log(arguments.callee);
}
foo('jack', '18', 'male');

let collections = document.getElementsByTagName('div');
console.log(collections);
console.log(typeof collections);
console.log(Object.prototype.toString.call(collections));

var list = document.querySelectorAll('div[class=item]');
for (var checkbox of list) {
  checkbox.checked = true;
}
console.log(list);
console.log(typeof list);
console.log(Object.prototype.toString.call(list));

// -------------------------------------------- 类数组应用场景 --------------------------------------------/
/**
  1. 遍历函数的参数, 对函数的参数进行操作
  2. 定义链接字符串函数
  3. 传递参数使用 (call, apply) 
     可以借助 arguments 将参数从一个函数传递到另一个函数
 */

function add() {
  let totalSum = 0;
  for (let index = 0; index < arguments.length; index++) {
    const element = arguments[index];
    totalSum = totalSum + element;
  }
  return totalSum;
}
console.log(add());
console.log(add(1, 2));
console.log(add(1, 2, 7));

function myConcat(separa) {
  var args = Array.prototype.slice.call(arguments, 1);
  console.log(args.join(separa));
  return args.join(separa);
}
myConcat(', ', 'red', 'orange', 'blue');
myConcat('; ', 'elephant', 'lion', 'snake');
myConcat('. ', 'one', 'two', 'three', 'four', 'five');

// 使用 apply 将 foo 的参数传递给 bar
function foo() {
  bar.apply(this, arguments);
}
function bar(a, b, c) {
  console.log(a, b, c);
}
foo(1, 2, 3, 4);
console.log('---------------------------');

// -------------------------------------------- 类数组转化为数组 --------------------------------------------/
/**
  1. 借用数组原型链上的方法转化为数组（Array.prototype.slice.call, Array.prototype.concat.apply）
  2. 使用`Array.from`转化为数组
  3. 使用展开运算符 `...`
 */

let arraylike = {
  0: 'js',
  1: 'ts',
  length: 2,
};
console.log(Array.isArray(arraylike));
Array.prototype.push.call(arraylike, 'vue', 'react');
console.log(arraylike);

function addMenthod() {
  console.log(arguments);
  //   let tmpArray = Array.prototype.slice.call(arguments, 0);
  let tmpArray = Array.prototype.concat.apply([], arguments);
  console.log(tmpArray);
}
addMenthod('xiaoming', 'xioahua', 'lining');

function deleteMethod() {
  //   let tmpArray = Array.from(arguments);
  let tmpArray = [...arguments];
  console.log(tmpArray);
  console.log(Array.isArray(tmpArray));
}
deleteMethod('js', 'ts', 'vue', 'react');
