//Promise 内部究竟有几种状态？
/**
 * ① 待定（pending） ② 已完成（fulfilled）③ 已拒绝（rejected）
 * 只能从 pending -> 已完成 或者 pending -> 已拒绝  且内部状态改变之后不可逆
 */

/*
 Promise 如何解决回调地狱 ?
 Promise 利用了三大技术手段来解决回调地狱：
 ① 回调函数延迟绑定: 回调函数不是直接声明的，而是通过后面的 then 方法传入的，即延迟传入，这就是回调函数延迟绑定
 ② 返回值穿透：把返回的 Promise 穿透到外层，以供后续的调用
 ③ 错误冒泡：前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了
*/

function getUrlResult(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof message === 'string') {
        resolve(message);
      } else {
        reject(`${message}__不是字符串`);
      }
    }, 1000);
  });
}

function testRace(message, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof message === 'string') {
        resolve(message);
      } else {
        reject(`${message}__不是字符串`);
      }
    }, time);
  });
}

getUrlResult('我是小明').then((res) => {
  console.log(res);
});

let result = getUrlResult('A').then((res) => {
  return getUrlResult(res + 'B');
});
//result 指的就是内部返回的 Promise
console.log(result);
result.then((res) => {
  console.log(res);
});

getUrlResult('123')
  .then((res) => {
    return getUrlResult('我是字符串');
  })
  .then((res) => {
    return getUrlResult(235);
  })
  .then((res) => {
    return getUrlResult('hhhhhhhh');
  })
  .catch((error) => {
    console.log(error);
  });

//  -------------------- Promise 的静态方法 -------------------- /
//all:当都成功时才返回成功，只要有一个失败时就会走`catch`方法
Promise.all([getUrlResult('hhhhhh'), getUrlResult('eeeeeee'), getUrlResult('rrrrrrrr')])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//allSettled :不管单个promise成功或失败，都会返回每个每个promise执行的结果
Promise.allSettled([getUrlResult('hhhhhh'), getUrlResult('eeeeeee'), getUrlResult(9999)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//any: 只要一个参数promise对象的实例变成fulfilled，最后any返回的实例就会变成fulfilled。
//只有当所有参数promise实例都返回rejected，最后any实例返回的是rejected状态
Promise.any([getUrlResult(2222222), getUrlResult('xiaoming'), getUrlResult(9999)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//race: 只要参数的promise之中有一个实例率先改变了状态，则race方法的返回状态就跟着改变
Promise.any([testRace('lining', 2000), testRace(111111, 2000), testRace('jianailiang', 1000)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
