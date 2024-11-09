---
title: 数据类型与类型转换
excerpt_type: md
categories:
  - Frontend
  - JavaScript
  - DataType
tags:
  - JavaScript
---

JS中的数据类型大致可以分为两个大类，基本数据类型和引用数据类型。细分下来则有八个数据类型。

+ 基本数据类型：number string boolean null undefined symbol bigint
+ 引用数据类型：object（包含Array、Function等）

在内存中的存储模式上，基本数据类型存储在栈中，引用数据类型存储在堆中。

<!-- more -->

## 类型判断

（1）**typeof**。最常用的数据类型判断方法，缺点在于判断null和Array时，都会返回object。

（2）**instanceof**。利用原型链判断数据类型，左侧为实例，右侧为构造函数。

```javascript
function myInstance(obj, fn) {
  if (typeof obj !== 'object' || typeof fn !== 'function') {
    throw new Error('数据类型不合规')
  }
  let proto = Object.getPrototypeOf(obj)
  while (true) {
    if (!proto) return false
    if (proto === fn.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

（3）**Object.prototype.toString.call()**。不能直接调用对应类型的toString()方法，因为像Array、Function作为Object的实例，对于toString()
方法进行了重写，直接调用时会先调用被重写的方法导致无法返回数据类型的判断结果。

（4）**constructor**。

## 类型转换

JavaScript中的数据类型转换总体上来说，都是其他数据类型转换为数字、字符串和布尔值三种情况。

### 数字

+ `undefined`转换为`NaN`。
+ `null`转换为0。
+ `true`转换为1，`false`转换为0。
+ `string`中如果都是数字则对应转换，否则就是`NaN`。
+ **<font style="color:#DF2A3F;">空数组转换为0，只有一个数字转换为该数组，其余情况为NaN</font>**
  **<font style="color:#DF2A3F;">。除了数组之外的其他引用类型的数据都转换为NaN。</font>**
+ `**Symbol**`**不能转换为数字，会直接报错。**

### 布尔值

+ 0转为`false`，1转为`true`。`NaN`也转为`false`。
+ `undefined null`都转换`false`。
+ 空字符串转换为`false`，其余都为`true`。
+ **<font style="color:#DF2A3F;">引用类型的数据转换为布尔值都是true。</font>**

### 字符串

+ `number`转为对应的字符串。
+ 数组会把数组的每一项取出来拼成字符串。

```plain
[1, 2] => '1, 2'
```

+ 对象类型的数据转为'[Object Object]'

### 对象

除了特殊Date对象，将对象转换为基本值的时候一般遵循以下步骤。

1. 调用 **Symbol.toPrimitive()** 方法，这是JavaScript中所有值都包含的方法，用于将值转换为基本值。
2. 调用 **valueOf()** 方法。如果为基本值则直接返回，非基本值则进行下一步。
3. 调用 **toString()** 方法尝试转换为字符串，为基本值直接返回，否则进行下一步。
4. 抛出TypeError异常。

Date对象的区别主要在于第2步和第3步的调用顺序正好相反。

## 类型比较

### == 、=== 和Object.is()

+ == 会尝试将两边的数据都转换为number类型之后再进行比较。

```javascript
1 == '1'  //true
0 == false // true
```

+ === 数据强相等比较，不会进行数据类型转换，两边的数据类型如果不一致则直接返回false。
+ Object.is()判断数据是否相等，大多数情况下和===一致。仅有的区别在于，**<font style="color:#DF2A3F;">+0和-0不再被认为是相等，两个NaN被认为是相等的。</font>
  **

## 常见面试题

### a==1 && a ==2

== 会尝试将左右两侧的变量转换为number类型之后再进行，于是依据数据类型的转换规则可以定义：

```javascript
const a = {
  value: 0,
  valueOf() {
    this.value++
    return this.value
  }
}
console.log(a == 1 && a == 2) // true
```

### [] == ![]

`==`操作符会尽量将两侧的值转换为number类型之后再进行比较。

左侧是一个空数组，按照类型转换的规则，**空数组转为数字0**。右侧首先采用取反操作符，因此将空数组转换为布尔值，**任何引用类型转换为布尔值都是true**
，所以取反之后右侧的结果就是false。

最后相当于是 0 == false，false转换为数字类型是0，所以 **<font style="color:#DF2A3F;">该表达式返回结果为true</font>**。

### 0 == null

按照正常的隐式类型转换的方式来看，`null`会被转换为0，所以自然返回`true`，但是答案其实是`false`。

`ES`规范规定，`null/undefined`使用`==`的方式和其他数字进行比较的时候不会进行类型转换，所以直接是`false`，特殊情况记住就行。

也是告诉我们使用`==`这种方式做隐式类型转换不靠谱。

## NaN

`NaN`全称`Not a Number`，说明数据是一个非数值类型的值，所以一般情况下

```javascript
console.log(Nan === NaN) //false
```

毕竟两个值都不是数字，你总不能说它们是相等的。

但是有趣的事情又来了，用类型判断函数看看`NaN`会返回什么呢？

**<font style="color:#DF2A3F;">数据结构中会将看做相同的元素而进行去重NaN。</font>**

```javascript
console.log(typeof NaN) //number
```

是不是相当逆天？

关于`NaN`还有两个函数`isNaN`和`Number.isNaN`。

+ isNaN通过能不能转换为数字进行判断，不能转换为number类型的数据会返回true。
+ 后者则是先判断传入的参数是不是number类型，如果是再判断是不是`NaN`，该方法对于NaN的判断要更加精确。

