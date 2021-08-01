console.log(JSON.stringify(undefined));
console.log(JSON.stringify(true));
console.log(JSON.stringify(false));
console.log(JSON.stringify(123));
console.log(JSON.stringify(Symbol.for('hhh')));
console.log(JSON.stringify(null));
console.log(JSON.stringify('xiaoming'));
console.log(JSON.stringify(NaN));
console.log(JSON.stringify(Infinity));
console.log(JSON.stringify(Function));
console.log(JSON.stringify(/\.css$/));
console.log(JSON.stringify(new Date()));

let objA = {
  name: undefined,
  age: Symbol.for('hhh'),
  height: function () {},
  [Symbol.for('hhh')]: 'xiaoming',
  // toJSON() {
  //   return "我是序列化的字符串";
  // },
};
console.log(JSON.stringify(objA));
console.log('--------------------------------------------------');

// 手动实现`JSON.Stringify`
function jsonStringify(data) {
  let type = typeof data;
  if (type !== 'object') {
    let result = data;
    if (Number.isNaN(data) || data === Infinity) {
      return 'null';
    } else if (type === 'undefined' || type === 'symbol' || type === 'function') {
      return undefined;
    } else if (type === 'string') {
      return `"${result}"`;
    }
    return String(result);
  } else if (type === 'object') {
    if (data === null) {
      return 'null';
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON());
    } else if (data instanceof Array) {
      let result = [];
      data.forEach((item, index) => {
        if (typeof item === 'function' || typeof item === 'undefined' || typeof item === 'symbol') {
          result[index] = 'null';
        } else {
          result[index] = jsonStringify(item);
        }
      });
      result = `[${result}]`;
      return result.replace(/'/g, '"');
    } else {
      let result = [];
      Object.keys(data).forEach((item) => {
        if (typeof item !== 'symbol') {
          if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
            result.push(`"${item}":${jsonStringify(data[item])}`);
          }
        }
      });
      result = `{${result}}`;
      return result.replace(/'/g, '"');
    }
  }
}

//-------------------------------------------- 测试代码 --------------------------------------------------
let nl = null;
console.log(jsonStringify(nl) === JSON.stringify(nl));
// true
let und = undefined;
console.log(jsonStringify(undefined) === JSON.stringify(undefined));
// true
let boo = false;
console.log(jsonStringify(boo) === JSON.stringify(boo));
// true
let nan = NaN;
console.log(jsonStringify(nan) === JSON.stringify(nan));
// true
let inf = Infinity;
console.log(jsonStringify(Infinity) === JSON.stringify(Infinity));
// true
let str = 'jack';
console.log(jsonStringify(str) === JSON.stringify(str));
// true
let reg = new RegExp('w');
console.log(jsonStringify(reg) === JSON.stringify(reg));
// true
let date = new Date();
console.log(jsonStringify(date) === JSON.stringify(date));
// true
let sym = Symbol(1);
console.log(jsonStringify(sym) === JSON.stringify(sym));
// true
let array = [1, 2, 3];
console.log(jsonStringify(array) === JSON.stringify(array));
// true
let obj = {
  name: 'jack',
  age: 18,
  attr: ['coding', 123],
  date: new Date(),
  uni: Symbol(2),
  sayHi: function () {
    console.log('hi');
  },
  info: {
    sister: 'lily',
    age: 16,
    intro: {
      money: undefined,
      job: null,
    },
  },
};
console.log(jsonStringify(obj) === JSON.stringify(obj));
// true
