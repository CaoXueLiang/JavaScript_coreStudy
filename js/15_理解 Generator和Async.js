/**
 Generator 的执行有这几个关键点:
 
 ① 调用 gen() 后，程序会阻塞住，不会执行任何语句。
 ② 调用 g.next() 后，程序继续执行，直到遇到 yield 关键词时执行暂停。
 ③ 一直执行 next 方法，最后返回一个对象，其存在两个属性：value 和 done。
 */

function* gen() {
  console.log('enter');
  let a = yield 1;
  let b = yield (function () {
    return 2;
  })();
  return 3;
}
var g = gen(); // 阻塞住，不会执行任何语句
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log('----------------------');

function* gen1() {
  console.log('enter gen1');
  yield (function () {
    return 5;
  })();

  yield 10;
  console.log('执行完第二个 next');
  yield gen2();

  yield 15;
  console.log('执行完第三个 next');
}

function* gen2() {
  console.log('enter gen2');
  yield 2;
  yield 3;
}

let result = gen1();
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());

// -------------------- 2. thunk 函数介绍 -------------------- /
/*
 像 isType 这样的函数我们称为 thunk 函数, 他的基本思路是接收一定的参数，会生产出定制化的函数，最后使用定制化的函数去完成想要实现的功能
*/
let isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};
let isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
let isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};

let isStringMethod = isType('String');
let isFunctionMethod = isType('Function');
console.log(isStringMethod);
console.log(isStringMethod('xiaoming'));
console.log(isStringMethod(999));
console.log(isFunctionMethod(function test() {}));

// -------------------- 3. async 和 await -------------------- /
/**
 async/await 的方式比 Promise 和 Generator 好在哪里？
 ① 内置执行器：Generator 函数的执行必须靠执行器，因为不能一次性执行完成，所以之后才有了开源的 co 函数库。
   但是，async 函数和正常的函数一样执行，也不用 co 函数库，也不用使用 next 方法，而 async 函数自带执行器，会自动执行。
 ② 适用性更好：co 函数库有条件约束，yield 命令后面只能是 Thunk 函数或 Promise 对象，但是 async 函数的 await 关键词后面，可以不受约束。
 ③ 可读性更好：async 和 await，比起使用 * 号和 yield，语义更清晰明了
 */

async function func() {
  return 100;
}
console.log(func());

// readFilePromise 依旧返回 Promise 对象
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then((res) => res);
};
// 这里把 Generator的 * 换成 async，把 yield 换成 await
const genanother = async function () {
  const data1 = await readFilePromise('1.txt');
  console.log(data1.toString());
  const data2 = await readFilePromise('2.txt');
  console.log(data2.toString);
};
