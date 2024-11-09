---
title: JS中的浮点数计算精度问题
excerpt_type: md
categories:
  - Frontend
  - JavaScript
  - DataType
tags:
  - JavaScript
---

在JS中有一个经典的问题，就是 0.1 + 0.2 为什么不等于 0.3。在JS中输入 `0.1 + 0.2 === 0.3` 返回的结果是
false，说明JS认为两侧的结果不相等，这似乎违背了数学常识。
实际上这并非 JavaScript 这一门编程语言的问题，各种编程语言对于类似**浮点数的计算**都不太能把握得住。

计算机中，数字都是以二进制的形式存储的，包括在计算的过程中。虽然我们看到的都是十进制的数字，但是实际上计算机是将十进制的数字转换为二进制之后计算然后再输出十进制的。

简单来说就是计算机将 0.1 和 0.2 这两个数字转换为二进制存储后计算，然后将计算结果再转换为十进制呈现。小数转为二进制的规则是小数乘以2然后取整数部分，不断循环直至小数部分为0。但是
0.1 和 0.2 这两个小数转为二进制的时候都会存在无限循环的情况，而`IEEE754`标准规定存储的二进制最大位数为从第一个1开始的后**53**位，最后第54位采用0舍1入的方式，也即是近似存储。
正式由于这样才导致了计算时的误差。也就是我们看见的

> 0.1 + 0.2 = 0.30000000000000004 （小数点后17位）

由于存储的结果是近似值，那么计算出的结果自然也不准确，因此计算结果最后转换为十进制的时候就不是严格等于0.3了。

<!-- more -->

掘金上林三心大佬的文章写的很清晰。[0.1 + 0.2 != 0.3](https://juejin.cn/post/7041546152994406430)

## 解决方案

首先最明智的方案就是不要使用JS来进行浮点数的计算，并且避免把浮点数计算的结果作为项目中的某些重要逻辑的依据。但是如果业务中对浮点数计算有强制需求，可以参考下面两种方案。

+ **使用第三方库** [**Big.js**](https://github.com/MikeMcl/big.js/)。提供了使用JS进行任意精度运算的能力。
+ **手动引入Number.EPSILON**。MDN对此的解释：Number.EPSILON静态数据属性表示 1 与大于 1 的最小浮点数之间的差值。如果 0.1 +
  0.2 和 0.3之 间的误差值小于 Number.EPSILON 这个“机器精度”数字，可以认为两者相等。

```javascript
function equal(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

const x = 0.2;
const y = 0.3;
const z = 0.1;
console.log(equal(x + z, y)); // true


// 如果包含整数
function equal(x, y, tolerance = Number.EPSILON) {
  return Math.abs(x - y) < tolerance;
}

const x = 1000.1;
const y = 1000.2;
const z = 2000.3;
console.log(equal(x + y, z, 2000 * Number.EPSILON)); // true

```

