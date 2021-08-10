// 1. -------------------- push 方法的底层实现 -------------------- /
Array.prototype.push = function (...items) {
  let O = Object(this);
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;
  if (len + argCount > 2 ** 53 - 1) {
    throw new TypeError('the number of array is over the max value');
  }
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    O[len + index] = element;
  }
  O.length = len + argCount;
  return len + argCount;
};

let array1 = [1, 3, '5'];
let array2 = ['xiaoming', 'xioahua'];
let result = array1.push(...array2);
console.log(result);
console.log(array1);

// 2. -------------------- pop 方法的底层实现 -------------------- /
Array.prototype.pop = function () {
  let O = Object(this);
  let len = O.length;
  if (len === 0) {
    O.length = 0;
    return undefined;
  } else {
    let newLength = len - 1;
    let element = O[newLength];
    delete O[newLength];
    O.length = newLength;
    return element;
  }
};

let array3 = [1, 3, 'xiaohua'];
// let array3 = [];
console.log(array3.pop());
console.log(array3);

// 3. -------------------- map 方法的底层实现 -------------------- /
Array.prototype.map = function (callbackfn, thisArg) {
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + 'is not a function');
  }
  console.log(callbackfn, thisArg);
  let O = Object(this);
  let len = O.length;
  let T = thisArg;
  let A = new Array(len);
  for (let index = 0; index < len; index++) {
    const element = O[index];
    let newValue = callbackfn.call(T, element, index, O);
    A[index] = newValue;
  }
  return A;
};

let array4 = [1, 3, 'xiaohua', 7, 10];
let tmpArray = array4.map(function (item) {
  return item + 1;
}, window);
console.log(tmpArray);

// 4. -------------------- reduce 方法的底层实现 -------------------- /
Array.prototype.reduce = function (callbackfn, initialValue) {
  let O = Object(this);
  let len = O.length;
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + 'is not a function');
  }
  if (len === 0 && initialValue === undefined) {
    throw new TypeError('initialValue is not present');
  }
  let accumulator = initialValue ? initialValue : undefined;
  for (let index = 0; index < len; index++) {
    const element = O[index];
    if (index === 0 && accumulator === undefined) {
      accumulator = element;
    } else {
      accumulator = callbackfn.call(undefined, accumulator, element, index, O);
    }
  }
  return accumulator;
};

let array5 = [1, 3, 'xiaohua', 7, 10];
let tmpArray5 = array5.reduce(function (pre, current, index, array) {
  return pre + current;
}, 5);
console.log(tmpArray5);
