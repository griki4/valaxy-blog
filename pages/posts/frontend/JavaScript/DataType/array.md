---
title: 数组
excerpt_type: md
categories:
  - Frontend
  - JavaScript
  - DataType
tags:
  - JavaScript
---

类数组转换为数组、常见的数组操作方法。
<!-- more -->

## 类型判断

除了常用的数据类型判断方法外，推荐判断数组的方法是使用 Array.isArray() 。

## 类数组转化为数组

### Array.from

from方法接收一个可迭代对象为参数并返回一个数组，所谓可迭代对象就是具有length属性并且有索引位置的对象。

```javascript
Array.from(arrayLike)
```

### slice

将数组操作方法应用于类数组对象身上，在实现函数的原型方法中就提到过。

```javascript
Array.prototype.slice.call(arrayLike)
```

### concat

将类数组对象和一个空数组做拼接操作，就能实现将类数组转化为数组

```plain
Array.prototype.concat.apply([], arrayLike)
```

## 实现数组原型方法

### flat

数组扁平化方法，接收两个参数，一个是数组另一个则是指定的扁平化维度。**注意数组默认是一维的，因此在进行递归调用的时候，实际需要降低的维度为n-1。**

```javascript
Array.prototype._flat = function (nums, depth) {
  //边界条件判断
  if (typeof nums !== Array || depth <= 0) return nums
  //采用reduce进行循环迭代的方式
  return nums.reduce(function (pre, cur) {
    if (Array.isArray(cur)) {
      return pre.concat(_flat(cur, depth - 1))
    } else {
      return pre.concat(cur)
    }
  }, [])
}
```

### push

```javascript
Array.prototype.push = function () {
  //push方法一次可以添加多个参数，并将参数因此放入数组的末尾
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
  }
  //push方法返回新数组的长度
  return this.length
}
```

### filter

filter英文直译过滤器，接收一个回调函数作为参数，回调函数中会设定筛选条件，满足条件的数组元素会被添加到filter方法返回的新数组中。

```javascript
Array.prototype._filter = function (fn) {
  //判断参数的数据类型
  if (typeof fn !== 'function') {
    throw Error('fn must be a function!')
  }
  let res = []
  for (let i = 0; i < this.length; i++) {
    //fn函数返回布尔值，true表示元素满足条件
    if (fn(this[i])) {
      res.push(this[i])
    }
  }
  return res
}
```

### map

map方法会遍历数组，执行回调函数，并将回调函数的执行结果组成一个新数组返回。

```javascript
Array.prototype._map = function (fn) {
  //判断参数的数据类型
  if (typeof fn !== 'function') {
    throw Error('fn must be a function!')
  }
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(fn(this[i]))
  }
  return res
}
```

### reduce

reduce接收一个函数和一个初始值为参数，难点在于是否指定初始值。

+ 若不指定初始值，则应当从数组的第二个元素开始遍历，因为此时prev默认为数组的第一个元素。
+ 若指定初始值，则从数组的第一个元素开始遍历。

所以需要判断初始值是否指定来判断从什么位置开始遍历数组。

回调函数的四个参数，初始值，当前值，当期值的索引，当前正在遍历的数组。

```javascript
Array.prototype._reduce = function (fn, init) {
  if (typeof fn !== 'function') {
    throw TypeError(`${fn} is not a function`)
  }
  //初始值不指定则默认数组第一个元素
  let pre = init || this[0]
  //根据是否指定初始值判断遍历起始位置
  let index = init ? 0 : 1
  for (; index < this.length; index++) {
    pre = fn(pre, this[index], index, this)
  }
  return pre
}
```

## 排序算法

### 冒泡排序

时间复杂度：最坏的情况O(n^2)，最好的情况O(n)

空间复杂度：O(1)

稳定性：稳定，相对元素顺序不会发生改变

特点：简单直观，适合小规模数据

冒泡排序包含原始版本和优化版本，优化版本主要是通过外层循环的flag变量来标记此次内层循环中是否发生了元素位置替换。若没有发生则说明数组所有元素已经排序完成，可直接中断外层循环。

原始版本

```javascript
function bubbleSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}
```

优化之后的版本

```javascript
function betterBubbleSort(nums) {
  let flag
  for (let i = 0; i < nums.length - 1; i++) {
    flag = false
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        flag = true
      }
    }
    // flag没有发生变化，交换逻辑没有发生，数组已经排序完成
    if (!flag) {
      break
    }
  }
  return nums
}
```

### 快速排序

时间复杂度：O(nlogn)

空间复杂度：O(logn)

稳定性：不稳定，相等元素之间的相对顺序可能会被改变

特点：适合大规模数据，**<font style="color:#DF2A3F;">但递归深度较大的情况下可能导致栈溢出。</font>**

```javascript
function quickSort(nums) {
  if (nums.length <= 1) return nums
  const index = Math.floor((nums.length / 2))
  const flag = nums.splice(index, 1)
  const left = []
  const right = []

  for (const number of nums) {
    if (number > flag) {
      right.push(number)
    } else {
      left.push(number)
    }
  }

  return quickSort(left).concat(flag, quickSort(right))
}
```

### 选择排序

时间复杂度：O(n^2)

空间复杂度：O(1)

稳定性：不稳定

特点：执行次数固定，适合小规模数据

保证当前遍历到的元素是数组未排序部分中最小的元素

```javascript
function selectionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], num[i]]
    }
  }
  return nums
}
```

### 插入排序

时间复杂度：O(n^2)

空间复杂度：O(1)

稳定性：稳定

特点：**<font style="color:#DF2A3F;">适合对于部分有序的数据进行排序</font>**。

将遍历到的元素插入到已经排序好的部分中，找一个合适的位置。

```javascript
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let key = nums[i]
    let j = i - 1

    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j]
      j--
    }
    nums[j + 1] = key
  }
  return nums
}
```

### 归并排序

时间复杂度：O(nlogn)

空间复杂度：O(n)

稳定性：稳定

特点：**<font style="color:#DF2A3F;">适合数据量较大且需要稳定排序的数据</font>**

类似排序链表一样的算法，将数组拆分为长度更小的子数组，然后通过合并两个数组的方式实现排序。

```javascript
function mergeSort(nums) {
  if (nums.length <= 1) return nums
  const middle = Math.floor(nums.length / 2)
  const left = mergeSort(nums.slice(0, middle))
  const right = mergeSort(nums.slice(middle))

  return merge(left, right)
}

function merge(left, right) {
  const res = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      res.push(left[leftIndex])
      leftIndex++
    } else {
      res.push(right[rightIndex])
      rightIndex++
    }
  }

  return res.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
```

## 实现数组乱序输出

和力扣384-打乱数组类似。洗牌算法。

核心思路：

+ 第一次随机生成一个数组索引，交换索引为0和当前索引的元素
+ 第二次随机生成一个索引值在1 - nums.length之间的索引，交换索引为1和生成的索引上的元素
+ 以此类推

代码

```javascript
function shuffle(nums) {
  for (let i = 0; i < nums.length; i++) {
    //随机从剩余位置取出一个索引
    let idx = Math.floor(Math.random() * (nums.length - 1)) + i
      //交换
      [nums[i], nums[idx]] = [nums[idx], nums[i]]
  }
  return nums
}
```

总结一下就是，相当于我们新建了一个和原数组长度一样的空数组。第一次我们随机从数组中取出一个元素，放入新数组的第一个空位；第二次随机从剩下的数组中挑选一个元素，放入新数组的第二个空位，不断循环最终就实现了数组的乱序输出。

难点就在于我们并未新建一个数组，而是直接在元素数组中进行交换元素的。可以用上面的思路来理解但是注意，**解题过程中我们并未新建数组，这样的解法节省了空间复杂度。
**

## 数组扁平化

数组扁平化的意思就是将一个高维数组通过一系列操作变成低维的甚至一维的。比如下面这个例子

```javascript
let arr = [1, [2, [3, 4]]]
let arr2 = flatten(arr)
console.log(arr2)//[1, 2, 3, 4]
```

### 递归实现

递归实现其实类似于手写深拷贝，就是不断遍历，当数组的元素还是一个数组的时候，继续调用扁平化函数，直到为常数项。如果元素是常数项则直接加入结果即可。

```javascript
function flatten(nums) {
  let result = []
  for (let i = 0; i < nums.length; i++) {
    if (Array.isArray(nums[i])) {
      result = result.concat(flatten(nums[i]))
    } else {
      result.push(nums[i])
    }
  }
  return result
}
```

### reduce函数实现

数组的reduce函数本身就是一个迭代方法，它可以处理数组的每一项并将处理的结果保存供后续迭代使用

```javascript
function flatten(nums) {
  return nums.reduce(function (pre, cur) {
//reduce的第二个参数指定为空数组的原因，因为reduce默认数组第一项为pre。但是数组第一项也可能是一个数组，必须经过判断处理
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
```

### ES6扩展运算符

该方法是结合了数组的some方法和ES6新增的数组扩展。执行流程，判断当前数组的元素中是否有数组，有则采用扩展运算符拆分数组，无则返回数组。通过不断的运用扩展运算符拆分数组，直到将数组降到一维。

```javascript
function flatten(nums) {
  while (nums.some(item => Array.isArray(item))) {
    nums = [].concat(...nums)
  }
  return nums
}
```

### ES新增的数组flat

这是ES6新增的一个数组方法，可以通过设定最大深度将数组降为，如果我们不知道数组的具体维度，直接将参数设置为Infinity即可。

```javascript
array, flat(Infinity)
```

### 调用toString和split方法

首先采用toString方法将高维度的数组拆分为逗号分隔的字符串，然后使用split方法将字符串重新拼接成为数组。

```javascript
function flatten(array) {
  return array.toString().split(',')
}
```

## 数组去重

### Set数据结构

采用ES6新增的数据结构Set，Set不允许存在重复元素，因此将数组作为参数传入Set，然后将Set转化为数组即可。

```javascript
Array.from(new Set(nums))
```

### 哈希表

map从遍历数组开始记录出现的数组元素，重复出现的元素不记录。未出现过的元素才记录并且放入结果数组中。

```javascript
function uniqueArray(nums) {
  let map = new Map()
  let res = []
  for (let i = 0; i < nums.length; i++) {
    if (!map.hasOwnProperty(nums[i])) {
      map.set(nums[i], 1)
      res.push(nums[i])
    }
  }
  return res
}
```

##
