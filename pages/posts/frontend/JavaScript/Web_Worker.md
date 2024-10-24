---
title: Web Workers
excerpt_type: md
categories:
    - Frontend
    - JavaScript
tags:
    - JavaScript
---

由于本身需要进行DOM操作，JavaScript在设计之初就被限制为单线程，因为谁都不想看到两个不同的JS线程对同一个DOM进行操作而导致的糟糕情况。单线程虽然避免了冲突，
但是带来了另一个问题，**阻塞**，后面的任务在前面的任务没有执行完成之前是没有办法的执行。在Web中有一个常见的情况。假设页面中有一个**非常耗时但是不影响用户交互的操作**，
那么页面必须等待这个耗时操作执行完毕才能响应用户的操作。Web Workers的出现就是为了解决类似的问题，将这个耗时的操作放到worker中执行，主线程则继续响应用户操作，worker中的操作执行完毕后，
将执行结果发送给主线程。

<!-- more -->

就好像一个人做一个费时费力的工作，可以将一些不影响主要结果的工作交给另一个人做，自己继续做更加重要的内容，等另一个人的工作完成之后，他再将工作结果交给你。

## 专用Worker

专用Worker仅能够被创建它的脚本所使用，下面是一个简单的专用Worker的例子
```js
// main.js
const firstNumber = document.querySelector('#number1')
const secondNumber = document.querySelector('#number2')
const resultNumber = document.querySelector("#result")

if (window.Worker) {
    // Worker接口， 参数为worker所在文件的文件名
    const myWorker = new Worker('worker.js')
    
    [firstNumber, secondNumber].forEach(input => {
        input.onchange = function () {
            // 将需要处理的数据发送给worker
            myWorker.postMessage([firstNumber.value, secondNumber.value])
        }
    })
    // 接收worker处理完毕的数据
    myWorker.onmessage = function (e) {
        resultNumber.textContent = e.data
    }
}


// worker.js
onmessage = function (e) {
    // 获取数据并处理 将处理结果发回给主线程
    const result = e.data[0] * e.data[1]
    postMessage('Result: ' + result)
}
```

上面例子展示了使用专用Worker的步骤和方法

1. 使用`Worker()`接口可以创建一个`worker`，参数为worker所在的文件的名称。
2. 主线程和worker之间通过postMessage和onmessage来发送和接收消息。
3. **主线程使用`postMessage`和`onmessage`必须挂载到`worker`实例上，而在worker中指直接使用即可。**

## 共享Worker

共享的意思是这种类型的Worker可以供多个脚本使用。还是一个简单的例子。
```js
// multipy.js
const first = document.querySelector('#number1')
const second = document.querySelector('#number2')
const result1 = document.querySelector('#result1')

if (!!window.SharedWorker) {
    const myWorker = new SharedWorker('worker.js')
    
    first.onchange = function () {
        myWorker.port.postMessage([first.value, second.value])
    }
    
    second.onchange = function () {
        myWorker.port.postMessage([first.value, second.value])
    }
    
    myWorker.port.onmessage = function (e) {
        result1.textContent = e.data
    }
}

// square.js
const squareNumber = document.querySelector('#number3')
const result2 = document.querySelector('result2')

if (!!window.SharedWorker) {
    const myWorker = new SharedWorker('worker.js')
    
    squareNumber.onchange = function () {
        myWorker.port.postMessage([squareNumber.value, squareNumber.value])
    }
    
    myWorker.port.onmessage = function (e) {
        result2.textContent = e.data
    }
}
    
// worker
onconnect = function (event) {
    const port = event.ports[0]
    
    port.onmessage = function (e) {
        const result = e.data[0] * e.data[1]
        port.postMessage('Result: ' + result)
    }
}
```

共享Worker和专用Worker存在的区别主要有：

1. 创建worker实例时，应该使用`SharedWorker`。
2. 主线程发送和接收`worker`的消息时，应该通过`port`来实现。
3. worker内部通过`onconnect`来接收消息，并且需要通过事件对象的`ports`来获取端口并存储，传递消息给主线程时也需要通过`port`。


## 终止Worker

使用`myWorker,.terminate()`即可终止某个线程。

## 线程安全

Worker会真正生成操作系统级别的线程。不过`web worker`和其他现场的通信都得到了非常严格的限制，不能访问非线程安全的组件或者时DOM。
因此，一般情况下都不需要担心由此引起的现场安全问题。