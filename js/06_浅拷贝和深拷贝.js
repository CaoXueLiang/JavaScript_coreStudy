//对象类型在赋值过程中其实是赋值了对象的地址。从而导致一个对象改变的时候，另一个对象也发生改变

//1. -------浅拷贝---------
let a = {
  age: 18,
};
let b = a;
a.age = 20;
console.log(b.age);
console.log(a.age);
