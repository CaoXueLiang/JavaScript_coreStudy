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
