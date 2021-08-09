/**
 * 数组扁平化：就是将一个嵌套多层的数组转化为只有一层的数组 （将多维的数组转化为一维数组）
 */

// 方法-：普通的递归实现
let array1 = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (Array.isArray(element)) {
      result = result.concat(flatten(element));
    } else {
      result.push(element);
    }
  }
  return result;
}
console.log(flatten(array1));

// 方法二：利用`reduce`函数迭代
let array2 = [1, [2, [3, 4, 5]]];
function flatten2(arr) {
  return arr.reduce((preValue, currentValue) => {
    let normalArray = Array.isArray(currentValue) ? flatten2(currentValue) : currentValue;
    return preValue.concat(normalArray);
  }, []);
}
console.log(flatten2(array2));

// 方法三：扩展运算符实现 (不理解❌)
var arr = [1, [2, [3, 4]]];
function flatten3(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten3(arr));

// 方法四：split 和 toString 共同处理 (存在一个问题：会将`number`类型的也会转化为`string`)
let array3 = [1, [2, ['3', 4, 5]]];
function flatten4(arr) {
  return arr.toString().split(',');
}
console.log(flatten4(array3));

// 方法五：调用 ES6 中的 flat (参数也可以传进 Infinity，代表不论多少层都要展开)
let array5 = [1, [2, ['3', 4, 5]]];
function flatten5(arr) {
  return arr.flat(Infinity);
}
console.log(flatten5(array5));

// 方法六：正则和 JSON 方法共同处理
/* 将 JSON.stringify 的方法先转换为字符串，然后通过正则表达式过滤掉字符串中的数组的方括号，最后再利用 JSON.parse 把它转换成数组 */
let array6 = [1, [2, ['3', 4, 5]]];
function flatten6(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/\[|\]/g, '');
  str = `[${str}]`;
  return JSON.parse(str);
}
console.log(flatten6(array6));

// -------------------------------------------- 作业：数组去重--------------------------------------------/
//普通for循环实现
let array7 = [1, 2, 3, 2, 5, 6, 5];
function removeDuplicates(arr) {
  let result = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (!result.includes(element)) {
      result.push(element);
    }
  }
  return result;
}
console.log(removeDuplicates(array7));

//使用set进行去重
let array8 = [1, 2, 3, 2, 5, 6, 5];
function removeDuplicates2(arr) {
  let result = new Set();
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    result.add(element);
  }
  return Array.from(result);
}
console.log(removeDuplicates2(array8));
