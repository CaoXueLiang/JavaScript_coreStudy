/**
 在课程开始前请你先思考几个问题。
 1. 数组的构造器有哪几种？
 2. 哪些是改变自身的方法？
 3. 哪些是不改变自身的方法？
 4. 遍历的方法有哪些？
 */

// -------------------------------------------- 数组构造器 --------------------------------------------/
/**
 * ① new Array()
 * ② 字面量语法`[]`
 * ③ `Array.of`
 *    Array.of 用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其他。它基本上与 Array 构造器功能一致，唯一的区别就在单个数字参数的处理上
 * ④ `Array.from`
 *    基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象中创建一个新的数组实例 ,只要一个对象有迭代器，Array.from 就能把它变成一个数组（注意：是返回新的数组，不改变原对象）
 *    除了上述 obj 对象以外，拥有迭代器的对象还包括 String、Set、Map 等
 */
let arrayA = new Array(8);
console.log(arrayA);

let arrayB = [];
arrayB.length = 5;
console.log(arrayB);

let arrayC = new Array('xiaoming', 18, '180cm');
console.log(arrayC);

let arrayD = Array.of(8);
console.log(arrayD);

let arrayE = Array.of(8, '10', 'xiaohua');
console.log(arrayE);

var obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
let tmpArray = Array.from(
  obj,
  function (value, index) {
    return value.repeat(3);
  },
  obj
);
console.log(tmpArray);

let tmpArrayA = Array.from(obj, (value) => {
  return value + '1';
});
console.log(tmpArrayA);
console.log('-------------------------------------------');

console.log(Array.from('abcd'));
console.log(Array.from(new Set(['abc', 'def'])));
console.log(
  Array.from(
    new Map([
      [1, 'ab'],
      [2, 'de'],
    ])
  )
);

// -------------------------------------------- 改变自身的方法 --------------------------------------------/
/** push, pop, shift, unshift, sort, splice, reverse */

let array1 = ['xiaoming', 'xiaohua'];
let tmpArray1 = array1.push('lining');
console.log(array1);
console.log(tmpArray1);

let tmpArray2 = array1.pop();
console.log(tmpArray2);
console.log(array1);

let tmpArray3 = array1.shift();
console.log(tmpArray3);
console.log(array1);

let array4 = ['xiaoming', 'xiaohua'];
let tmpArray4 = array4.unshift('liangliang', 'heye');
console.log(tmpArray4);
console.log(array4);

let array5 = ['xiaoming', 'xiaohua'];
// let tmpArray5 = array5.splice(1, 1, 'liangliang', 'lining');
let tmpArray5 = array5.splice(1, 0, 'huahau');
console.log(tmpArray5);
console.log(array5);

let array6 = [1, 10, 5];
let tmpArray6 = array6.sort(function (a, b) {
  return a - b;
});
console.log(tmpArray6);
console.log(array6);

let array7 = ['js', 'ts', 'vue', 'react'];
let tmpArray7 = array7.reverse();
console.log(tmpArray7);
console.log(array7);
console.log('-------------------------------------------');

// -------------------------------------------- 不改变自身的方法 --------------------------------------------/
/** indexOf, lastIndexOf, toString, toLocalString, map, filters, reduce, includes */

let array8 = ['js', 'ts', 'vue', 'react', 'vue'];
let tmpindex8 = array8.indexOf('vue');
let indexIndex9 = array8.lastIndexOf('vue');
console.log(tmpindex8);
console.log(indexIndex9);
console.log(array8.toString());
console.log(array8.toLocaleString());
console.log(array8);

let tmpArray10 = array8.map((res) => {
  return res + '01';
});
console.log(tmpArray10);
console.log(array8);

let array11 = [1, 20, 10, 30];
let tmpArray11 = array11.filter((item) => {
  return item > 10;
});
console.log(tmpArray11);
console.log(array11);

let array12 = [1, 20, 15];
let tmpArray12 = array12.reduce((previousValue, currentValue) => {
  return previousValue + currentValue;
}, 0);
console.log(tmpArray12);
console.log(array12);

let array13 = ['xiaoming', 'xiaoli', 'huahua'];
let index13 = array13.includes('xiaoli');
console.log(index13);
console.log(array13);

// -------------------------------------------- 数组遍历的方法 （不会改变自身的遍历方法）--------------------------------------------/
/** forEach, fliter, map, reduce, find, findIndex, keys, values */
let array14 = [10, 2, 30, 25];
let tmpArray14 = array14.forEach((item, index) => {
  item = item + 1;
});
console.log(tmpArray14);
console.log(array14);

var array15 = [1, 3, 5, 7, 8, 9, 10];
function f(value, index, array) {
  return value > 4;
}

let index15 = array15.find(f);
let index16 = array15.findIndex(f);
console.log(index15);
console.log(index16);
console.log(array15);
