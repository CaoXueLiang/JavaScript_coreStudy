// 1. -------------------- 回调函数 -------------------- /
/**
   回调实现异步编程的场景：
   ① ajax请求的回调
   ② 定时器中的回调
   ③ 事件回调
   ④  Nodejs中的一些方法回调 
 */

function callBackMethod(message, callbackfn) {
  setTimeout(() => {
    callbackfn('我是回调函数的内容_' + message);
  }, 5000);
}

//嵌套多层会形成回调地狱
callBackMethod('哈哈哈', function (res) {
  console.log(res);
  callBackMethod(res, function (res1) {
    console.log(res1);
  });
});

// 2. -------------------- Promise -------------------- /
function getUrlResult(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}

getUrlResult('A')
  .then((res) => {
    return getUrlResult(res + 'B');
  })
  .then((res) => {
    return getUrlResult(res + 'C');
  })
  .then((res) => {
    return getUrlResult(res + 'D');
  })
  .then((res) => {
    console.log(res);
  });

// 3. -------------------- Generator -------------------- /
function* idMaker() {
  let index = 0;
  while (index < 4) yield index++;
}

let gen = idMaker(); // "Generator { }"
console.log(gen);

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// 4. -------------------- async/await -------------------- /
//async 是 Generator 函数的语法糖, async/await 的优点是代码清晰，可以处理回调地狱的问题。
//async/await 写起来使得 JS 的异步代码看起来像同步代码
function getAwaitResult(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve(message);
    }, 5000);
  });
}

async function test() {
  await getAwaitResult('呵呵呵呵呵');
  console.log('123');
}
test();
