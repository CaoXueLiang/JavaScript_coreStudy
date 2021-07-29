//-----------------------------1. 通过原型实现继承 ----------------------------------/
/* //person类
    function Person(name,age,height,favorites){
        this.name = name;
        this.age = age;
        this.height = height;
        this.favorites = favorites
     }
     Person.prototype.greet = function(){
         console.log(`欢迎 ${this.name}同学!`)
     }
     Person.prototype.myFavorites = function(){
         console.log(`我的爱好是` + this.favorites)
     }
     const tmpPerson  = new Person('小明',18,180,['唱歌','跳舞','弹琴'])
     console.log(tmpPerson)
     tmpPerson.greet()
     tmpPerson.myFavorites()
     console.log(Person.prototype)
     console.log(tmpPerson.__proto__)
 
     //teacher类继承person类
     function Teacher(name,age,height,favorites,subject){
         Person.call(this,name,age,height,favorites)
         this.subject = subject
     }
     Teacher.prototype = Object.create(Person.prototype)
     Teacher.prototype.greet = function(){
         console.log(`我是 ${this.name}老师，我教的科目是${this.subject}`)
     }
     const tmpTeacher = new Teacher('小红',20,165,['弹琴','骑车'],'数学')
     console.log(tmpTeacher)
     tmpTeacher.greet()
    
     console.log(tmpTeacher.__proto__)
     console.log(tmpTeacher.__proto__.__proto__.__proto__.__proto__) */

//-----------------------------2. 通过Class实现继承 ----------------------------------/
class Person {
  constructor(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
  }
  greeting() {
    console.log(`大家好,我是${this.name}`);
  }
  introduction() {
    console.log(
      `大家好，我是${this.name},今年${this.age}岁，身高${this.height}cm`
    );
  }
}

const person1 = new Person("李宁", 19, 185);
console.log(person1);
person1.greeting();
person1.introduction();

class Teacher extends Person {
  constructor(name, age, height, subject) {
    super(name, age, height);
    this.subject = subject;
  }
  greeting() {
    console.log(`我是${this.name}老师`);
  }
  teaching() {
    console.log(`我教授的科目是${this.subject}`);
  }

  get tmpSubject() {
    return this.subject;
  }

  set tmpSubject(newSubject) {
    this.subject = newSubject;
  }
}

const teacher1 = new Teacher("李永乐", 40, 180, "数学");
console.log(teacher1);
teacher1.greeting();
teacher1.introduction();
teacher1.teaching();
console.log(teacher1 instanceof Teacher);

teacher1.subject = "语文";
console.log(teacher1);
console.log(Object.getPrototypeOf(teacher1));
