/*
闭包: 能访问其他函数内部变量的函数叫做闭包
*/

function makeFunction() {
  let name = "小明";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

let tmpFunction = makeFunction();
tmpFunction();
console.log("---------------------");

//------------------1.隐藏私有变量----------------------
//计数器函数
const makeCounter = function () {
  let privireCounter = 0;
  function changedBy(val) {
    privireCounter += val;
  }
  return {
    increment: function () {
      changedBy(1);
    },
    decrement: function () {
      changedBy(-1);
    },
    value: function () {
      return privireCounter;
    },
  };
};

const counter1 = makeCounter();
const counter2 = makeCounter();
counter1.increment();
counter1.increment();
counter1.decrement();
console.log(counter1.value());
counter2.decrement();
counter2.decrement();
console.log(counter2.value());

//-------------------2. 解决for循环问题------------------
for (var index = 0; index < 5; index++) {
  (function (i) {
    setTimeout(() => {
      console.log("----" + i);
    }, 100);
  })(index);
}
