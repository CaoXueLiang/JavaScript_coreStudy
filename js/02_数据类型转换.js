// 1. 强制类型转换
/** Number()、parseInt()、parseFloat()、toString()、String()、Boolean() */
let objA = {
  value: 100,
  [Symbol.toPrimitive]: function () {
    return 400;
  },
  valueOf: function () {
    return "a200";
  },
  toString: function () {
    return 300;
  },
};
console.log(Number(true));
console.log(Number(100));
console.log(Number(null));
console.log(Number(undefined));
console.log(Number(""));
console.log(Number("-1111"));
console.log(Number("0.12"));
console.log(Number("0x11"));
console.log(Number("abc"));
// console.log(Number(Symbol.for("symbol"))); //报错
console.log(Number(objA));
console.log("------------------------");

//Boolean()强制类型转换，(null, underfined, false, NaN, '', 0 返回的是false，其余的转换都是true)
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(""));
console.log(Boolean(-0));
console.log(Boolean("134"));
console.log(Boolean(new Object()));
console.log("------------------------");

// 2. 隐式类型转换 (① 逻辑运算符 && || !, ② 关系运算符 >,>=,<,<= ③ if/while条件)
/*
  '==' 的隐式类型转换规则
  ① 如果一个值为 null 或 underfined, 另一个值为null或者underfined时才会返回true，否者就会返回false
  ② 如果其中一个是Symbol类型，那么返回false
  ③ 如果两个操作数是`string`和`number`类型，那么就会将字符串转化为`number`
  ④ 如果一个操作值是`boolean`，那么转换为`number`
  ⑤ 如果一个操作值为`Object`,且另一方为`string`,`number`,或者`symbol`,那么会把Object转化为原始数据类型在进行判断。（调用valueOf和toString方法进行转换）
 */
console.log(null == undefined);
console.log(Symbol.for("1") == Symbol);
console.log("123" == 123);
console.log("" == 0);
console.log(false == 0);
console.log(true == 1);
let a = {
  value: 0,
  valueOf: function () {
    this.value++;
    return this.value;
  },
};
console.log(a == 1 && a == 2 && a == 3);
console.log("------------------------");

/**
 '+' 的隐式类型转换规则
  ① 如果其中有一个是字符串，另外一个是 undefined、null 或布尔型，则调用 toString() 方法进行字符串拼接；
     如果是纯对象、数组、正则等，则默认调用对象的转换方法会存在优先级，然后再进行拼接
  ② 如果其中有一个是数字，另外一个是 undefined、null、布尔型或数字，则会将其转换成数字进行加法运算，对象的情况还是参考上一条规则
  ③ 如果其中一个是字符串、一个是数字，则按照字符串规则进行拼接

   ！如果数据中有字符串，JavaScript 类型转换还是更倾向于转换成字符串 
 */
console.log(1 + 2); //3
console.log("1" + "2"); //12
console.log("1" + undefined); //1underfined
console.log("1" + null); //1null
console.log("1" + true); //1ture
console.log("1" + false); //1false
console.log("1" + 1n);
console.log(1 + undefined); //NaN
console.log(1 + null); //1
console.log(1 + true); //2
console.log("1" + 3); //13
console.log(1 + {});
console.log({} + 1);
console.log("------------------------");

/**
  Object 的转换规则
  ① 如果部署了 Symbol.toPrimitive 方法，优先调用再返回
  ② 调用 valueOf()，如果转换为基础类型，则返回
  ③ 调用 toString()，如果转换为基础类型，则返回
  ④ 如果都没有返回基础类型，会报错
 */

let objectB = {
  value: 1,
  valueOf() {
    return {};
  },
  toString() {
    return "3";
  },
  [Symbol.toPrimitive]() {
    return 4;
  },
};

console.log(objectB + 1); //5
console.log({}.toString());
// "10[object Object]"，注意：{}会默认调用valueOf是{}，不是基础类型继续转换，调用toString，返回结果"[object Object]"，于是和10进行'+'运算，按照字符串拼接规则来
console.log(10 + {});
console.log({} + 10);
console.log([1, 2, undefined, 4].toString());
// 注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组，不是基础数据类型继续转换，也还是调用toString，返回"1,2,,4,5"，然后再和10进行运算，还是按照字符串拼接规则
console.log([1, 2, undefined, 4, 5] + 10); //1,2,,4,510
