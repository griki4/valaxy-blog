---
title: 字符串
excerpt_type: md
categories:
  - Frontend
  - JavaScript
  - DataType
tags:
  - JavaScript
---

正则表达式匹配模板字符串、驼峰命名和下划线命名方式之间的相互转换。

<!-- more -->

## 正则表达式

### 匹配模板字符串

实现一个render方法，匹配字符中的双重大括号，并将大括号中的变量替换为JSON对象中的属性。大括号中的JavaScript表达式则予以执行。

```javascript
const data = {
  name: "小明",
  age: 16,
  school: "第三中学",
  classroom: "教室2"
}


console.log(
  "{{ name }} 今年 {{ age }} 岁，就读于 {{ school }} 今天在 {{ classroom }} 上课，{{ name }} {{ #data.age >= 18 ? '成年了' : '未成年' }}".render(data)
);
// 小明 今年 16 岁，就读于 第三中学 今天在 教室2 上课，小明 未成年

console.log(
  `{{name}}说了句{{#
        if (data.age >= 18) {
            "我已经成年了！"
        } else {
            "我还没有成年！"
        }
    }}`.render(data)
);
// 小明说了句我还没有成年！
```

正则表达式解析：

+ **全局匹配**双重大括号 /{{}}/g。
+ 大括号内部**先匹配一个空格，然后匹配一个非空格。**
+ **非贪婪模式匹配*？**，匹配到最近的一个}}就结束。
  - 如果不加这个*？，则会发生下面的情况。正则表达式会尽可能多的匹配，直到最后一个}}。

```javascript
const greedyRegex = /{{.*}}/;
const str = 'abc{{def}}ghi{{jkl}}';
console.log(greedyRegex.exec(str)); // 输出 ["{{def}}ghi{{jkl}}"]
```

```javascript
String.prototype.render = function () {
  return this.replace(/{{[\s\S]*?}}/g, match => {
    match = match.slice(2, match.length - 2).trim()
    if (match === '') {
      return ''
    } else if (match.startsWith('#')) {
      return eval(match.slice(1))
    } else {
      return data[match] ? data[match] : ''
    }
  })
}
```

### 驼峰和下划线

驼峰是以**小写字母开头，然后以大写字母紧跟小写字母**组合的命名方式，所以对应的正则表达式：

```javascript
const camel = /^[a-z]+([A-z][a-z]*)*$/
```

下划线是以**小写字母开头，然后是下划线紧跟小写字母**的组合，其正则为：

```javascript
const underLine = /^[a-z](_[a-z]+)*$/
```

使用上述正则实现驼峰和下划线的转换

```javascript
let fun1 = 'myName'
let fun2 = 'my_name'

const camel = /^[a-z]+([A-Z][a-z]*)*$/
const underLine = /^[a-z]+(_[a-z]+)*$/


if (camel.test(fun1)) {
  console.log('驼峰命名法')
  console.log(fun1.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`).toLowerCase())
}

if (underLine.test(fun2)) {
  console.log('下划线命名法')
  console.log(fun2.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase()))
}
```

