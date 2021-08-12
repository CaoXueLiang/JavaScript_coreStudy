// ----------------构造函数-------------------
function newPromise(executor) {
  var self = this;
  self.status = 'pending'; //Promise当前的状态
  self.data = undefined; //Promise的值
  self.onResolvedCallback = []; //Promise resolve时的回调函数集
  self.onRejectedCallback = []; //Promise reject时的回调函数集

  function resolve(value) {
    if (self.status === 'pending') {
      self.status === 'fulfilled';
      self.data = value;
      for (let index = 0; index < self.onResolvedCallback.length; index++) {
        const element = self.onResolvedCallback[index];
        element(value);
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status === 'rejected';
      self.data = reason;
      for (let index = 0; index < self.onRejectedCallback.length; index++) {
        const element = self.onRejectedCallback[index];
        element(reason);
      }
    }
  }

  try {
    // 考虑到执行过程中有可能出错，所以我们用try/catch块给包起
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// ---------------- 实现 then 方法 -------------------
//then方法执行完之后可以拿到value和resaon，并且要保证then执行之后返回的依旧是一个promise方法，还要支持多次调用
newPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {};
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {};
  if (self.status === 'fulfilled') {
    return new newPromise(function (resolve, reject) {
      try {
        let x = onResolved(self.data);
        if (x instanceof newPromise) {
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果作为promise2的结果
          x.then(resolve, reject);
        }
        // 否则，以它的返回值作为promise2的结果
        resolve(x);
      } catch (error) {
        // 如果出错，以捕获到的错误作为promise2的结果
        reject(error);
      }
    });
  }

  if (self.status === 'rejected') {
    return new newPromise(function (resolve, reject) {
      try {
        let x = onRejected(self.data);
        if (x instanceof newPromise) {
          x.then(resolve, reject);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能确定如何处理
    return new newPromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          let x = onResolved(self.data);
          if (x instanceof newPromise) {
            x.then(resolve, reject);
          }
        } catch (err) {
          reject(err);
        }
      });

      self.onRejectedCallback.push(function (value) {
        try {
          let x = onRejected(self.data);
          if (x instanceof newPromise) {
            x.then(resolve, reject);
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }
};

console.log('-------------------------------------------------------------');

// try {
//   module.exports = Promise;
// } catch (e) {}
function Promise(executor) {
  var self = this;
  self.status = 'pending';
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    });
  }
  function reject(reason) {
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    });
  }
  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'));
  }
  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          function rs(y) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise2, y, resolve, reject);
          },
          function rj(r) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    resolve(x);
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (v) {
          return v;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (r) {
          throw r;
        };
  if (self.status === 'resolved') {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onResolved
        try {
          var x = onResolved(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }
  if (self.status === 'rejected') {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onRejected
        try {
          var x = onRejected(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }
  if (self.status === 'pending') {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
};
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
