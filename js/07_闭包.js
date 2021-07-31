/**
  在课程开始前请你先思考几个问题。
  1. JavaScript 中的作用域是什么意思? (①：全局作用域 ②：函数作用域 ③：块级作用域)
  2. 闭包会在哪些场景中使用？
  3. 通过定时器循环输出自增的数字通过 JS 的代码如何实现
 */

/**
  闭包的概念: 能够访问其他函数内部变量的函数，即一个定义在函数内部的函数
  闭包产生的本质就是: 当前环境中存在指向父级作用域的引用。
 */

/**
 * 闭包的表现形式及应用场景到底有哪些呢？
 * ① 返回一个函数
 * ② 定时器，事件监听，Ajax请求。只要使用了回调函数，实际上就是使用了闭包
 * ③ 作为函数参数传递的形式
 * ④ IIFE（立即执行函数），创建了闭包，保存了全局作用域（window）和当前函数的作用域
 */

for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

//从控制台执行的结果可以看出来，结果输出的是 5 个 6，那么一般面试官都会先问为什么都是 6？我想让你实现输出 1、2、3、4、5 的话怎么办呢？

/**
 * 问题一：为什么会输出5个6？
 * 1. setTimeout 为宏任务，由于 JS 中单线程 eventLoop 机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后 setTimeout 中的回调才依次执行。
 * 2. 因为 setTimeout 函数也是一种闭包，往上找它的父级作用域链就是 window，变量 i 为 window 上的全局变量，开始执行 setTimeout 之前变量 i 已经就是 6 了，因此最后输出的连续就都是 6。
 */

/**
 * 问题二：如何按顺序输出1，2，3，4，5呢？
 * ① 使用立即执行函数
 * ② 使用ES6中的let
 * ③ 定时器传入第三个参数
 */

for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 0);
  })(i);
}

for (let i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

for (var i = 1; i <= 5; i++) {
  setTimeout(
    function (j) {
      console.log(j);
    },
    0,
    i
  );
}
