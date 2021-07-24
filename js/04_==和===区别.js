// == 如果双方类型不一致就会进行类型转换

/* 1.首先判断两者类型是否一致，如果一致直接比较值
 * 2.如果类型不一致,会进行类型转换
 * 3.会先判断是否在对比null和undefined，是的话就返回true
 * 4.判断两者类型是否为string和number，是的话就将字符串转为number
 * 5.判断其中一方是否为boolean，是的话就将boolean转化为number，在进行判断
 * 6.判断一方为object，并且另一方为string，number，symbol。是的话会将object转化为原始类型在进行判断
 */

// === 是真正意义上的全等，判断两者类型和值是否相等
console.log(null == undefined);
console.log(1 === "1");
console.log(1 == "1");
let tmpObj = {
  name: "小明",
};
console.log(tmpObj);
console.log(tmpObj.toString() == "[object Object]");
