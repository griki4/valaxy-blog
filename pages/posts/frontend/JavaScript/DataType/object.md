---
title: 对象
excerpt_type: md
categories:
  - Frontend
  - JavaScript
  - DataType
tags:
  - JavaScript
---

JavaScript中对象的创建、拷贝和继承。
<!-- more -->

## new操作符创建对象

在JavaScript中调用new操作符创建对象时，一共会进行四步操作：

1. **创建空对象**。创建一个空的JavaScript对象，{}
2. **绑定原型。**将新对象的原型指向构造函数的prototype。
3. **修改this指向**，将构造函数的this指向新创建的对象。也即通过this定义在构造函数中的属性都会被定义给新创建的对象。
4. **查看返回值。**查看构造函数的返回值，返回基本值则忽略，返回对象类型则执行

```javascript
function myNew(constructor, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, constructor)
  const res = constructor.apply(obj, args)
  return res instanceof Object ? res : obj
}
```

## 判断一个对象为空的方法

+ 使用JSON

```javascript
const obj = {}
console.log(JSON.stringify(obj) === '{}') // true
```

+ Object.keys()

```javascript
const obj = {}
console.log(Object.keys(obj).length <= 0) //true
```

## 深拷贝与浅拷贝

### 基本概念

深拷贝和浅拷贝都是针对对象而言的。深浅拷贝的出现也是具有实际意义的，因为在JavaScript中经常需要使用到复制对象的方法，如果不了解这些方法的原理，在复制对象的时候是很容易踩坑的。

![](https://cdn.nlark.com/yuque/0/2024/png/32666946/1725282679723-193b643f-417a-42aa-ace8-a6f2c97fe85f.png)

### 浅拷贝

浅拷贝是创建一个新的对象，其拥有原对象属性值的精确复制。如果属性值为基本数据类型，就拷贝属性值；如果属性值为引用数据类型，则拷贝地址值。也就是说，如果其中一个对象更改了属性值，那么这些改变也会反应在新创建的对象中。

浅拷贝的实现思路很简单，遍历对象的属性然后赋给新对象。同时注意，**浅拷贝仅拷贝对象自身的属性，不会涉及任何对象原型身上的属性。**

****

**<font style="color:#DF2A3F;">对象浅拷贝的方法</font>**：

+ Object.assign({}, target)。
+ ES6扩展运算符，{...target}。
+ 手动实现。

```javascript
function shallowCopy(obj) {
  //检查是否为引用数据类型
  if (typeof obj !== 'object') return
  //根据原对象的类型确定新对象是数组还是普通对象
  let newObj = obj instanceof Array ? [] : {}
  //遍历所有属性并且赋值给新对象
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return obj
}
```

### 深拷贝

深拷贝则是相对浅拷贝而言的，深拷贝会开辟一块全新的内存空间存放拷贝的对象，并且修改其中一个对象的属性不会对另一个对象产生任何影响。

**<font style="color:#DF2A3F;">实现深拷贝的方法</font>**：

+ JSON。经过JSON转换之后的对象和原对象之间已经没有任何联系了，各自占用完全不同的内存空间。不过这样的方式也有缺点，对于循环引用和Date这类数据JSON无能为力。

```javascript
let obj = {name: 'Jack'}
let copyObj = JSON.parse(JSON.stingify(obj))
```

+ lodash等第三方库。lodash.cloneDeep方法提供了对象深拷贝的方式。
+ ES6新增的structuredClone()。
+ 手动实现。需要解决循环引用，支持ES6新增数据类型的问题。

```javascript
function deepClone(obj, map = new WeakMap()) {
  //类型判断
  if (typeof obj !== 'object' || obj === null) return obj
  //支持内置对象
  let reg = /^(Function|RegExp|Date|Set|Map)$/
  if (reg.test(obj.constructor.name)) {
    return new obj.constructor(obj)
  }
  //解决循环引用导致的栈溢出问题
  if (map.get(obj)) return map.get(obj)
  let cloneObj = new obj.constructor()
  map.set(obj, cloneObj)
  //拷贝属性
  for (let key in obj) {
    if (obj.hasOwnProperty(obj[key])) {
      cloneObj[key] = deepClone(obj[key], map)
    }
  }
  return cloneObj
}
```

## 对象继承

### 原型链继承

**<font style="color:#DF2A3F;">将子类的原型对象指向父类的实例</font>**的继承方法。

```javascript
function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(age) {
  this.age = age
}

Child.prototype = new Parent('Jack')
let person = new Child()
console.log(person.name)//Jack
```

原型链继承的缺点，所有子类的实例的__proto__访问到的是同一个原型对象，如果修改这个原型对象身上的属性，变化会影响到子类的所有实例。

### 构造函数继承

盗用构造函数继承，借助`call`来实现，把父类的`this`变为子类创造的实例对象。

```javascript
function P() {
  this.name = ['Dante']
}

P.prototype.get = function () {
  console.log(this.name)
}

function C() {
  P.call(this)
}

let a = new C()
// console.log(a.get()) //Uncaught TypeError: a.get is not a function
```

缺点也很明显，**<font style="color:#DF2A3F;">子类的实例无法访问父类的原型中定义的方法</font>**。

### 原型式继承

目前的原型式继承实际上已经通过JavaScript自带的Object.create()给集成了，因此可以通过Object.create()方法的作用反推原型式继承的实现方式。

```javascript
// 原型式继承函数
function inheritObject(o) {
  function F() {
  }

  F.prototype = o;
  return new F();
}

// O是被指定为原型对象的参数
```

### 组合继承

结合盗用构造函数继承和原型链继承的方式。

```javascript
function Parent1(name) {
  this.name = name
  this.weapon = 'power'
}

Parent1.prototype.sayName = function () {
  console.log(`this is ${this.weapon}`)
}

function Child(name, age) {
  this.name = name
  //使用构造函数继承
  Parent1.call(this, name)
  this.age = age
}

Child.prototype = new Parent1('Jack')
//原型的构造器本身还得是自己
Child.prototype.constructor = Child
let c2 = new Child(20)
console.log(c2.name, c2.weapon, c2.age)
c2.sayName()
```

<font style="color:#000000;">组合继承解决的问题：</font>

<font style="color:#000000;"></font>

+ 子类实例可以访问父类原型上定义的方法，解决盗用构造函数继承的却带你。


+ **<font style="color:#DF2A3F;">每个子类实例通过call的方式获得父类身上的属性，修改这些属性并不会影响到其他的子类实例</font>**。

<font style="color:#000000;">缺点在于，父类构造函数被调用了两次，可能会存在性能问题。</font>

### 寄生式继承

寄生式继承有三个步骤：

+ 创建一个父类的实例
+ 扩展该实例，比如给它添加新的属性值
+ 返回该实例

```javascript
// 父对象
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// 寄生式继承
function createStudent(name, age, grade) {
  // 创建一个继承自Person的实例
  var person = new Person(name, age);

  // 扩展这个实例
  person.grade = grade;
  person.study = function () {
    console.log(`${this.name} is studying in grade ${this.grade}.`);
  };

  // 返回这个实例
  return person;
}

// 使用寄生式继承创建一个Student对象
var student = createStudent('Alice', 20, 'Sophomore');
student.greet(); // 输出: Hello, my name is Alice and I am 20 years old.
student.study(); // 输出: Alice is studying in grade Sophomore.

```

### 寄生组合继承

最常见也是最为完美的一种实现继承的方式，综合上述两种继承的优点，同时避免了各自的缺点。

```javascript
function Parent1(name) {
  this.name = name
  this.weapon = 'power'
}

Parent1.prototype.sayName = function () {
  console.log(`this is ${this.weapon}`)
}

function Child(name, age) {
  this.name = name
  //使用构造函数继承
  Parent1.call(this, name)
  this.age = age
}

//Object.create实现原型链继承
Child.prototype = Object.create(Parent.prototype)
//原型的构造器本身还得是自己
Child.prototype.constructor = Child
let c2 = new Child(20)
console.log(c2.name, c2.weapon, c2.age)
c2.sayName()
```

注意链接原型链的方式是使用`Object.create`，以及最后还需要将子类的原型的构造器指定为子类本身，负责构造器就是父类了，这是不符合继承的本意的。寄生组合继承相比组合继承，解决了父类构造函数会被调用两次而带来的潜在性能问题。

在`ES6`中的`class`的`extends`实现的继承中，经过`babel`转义之后发现，`class`类的继承也是基于寄生组合继承来实现的。

