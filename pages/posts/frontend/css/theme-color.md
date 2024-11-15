---
title: 前端主题色切换方案
excerpt_type: md
categories:
  - Frontend
  - css
tags:
  - css
  - 前端
---

在一些网站中经常可以看到类似 `白天模式/夜晚模式` 的切换功能，比如我经常浏览的Vue.js的官网。在真实的业务开发场景中，也会存在这类需求。
因此这里简单总结以下目前常用的前端主题色切换的方案和各自的优缺点。更加详细的内容可以参考文章：[前端主题色切换方案](https://juejin.cn/post/7134594122391748615#heading-0)

<!-- more -->

## link标签动态引入

提前准备好几套主题色的CSS文件，然后通过 `link` 标签将样式动态添加到 html 中的 `head` 标签上。在需要进行主题色切换的时候，更改 `link` 标签的 href
属性以加载不同的CSS主题色文件。

<HairyImage class="rounded w-full h-150" fit="contain" src="/images/theme-link.png" />

## 提前引入样式 + 类名切换

相比于动态引入，类名切换的方式将所有的样式提前加载后，通过切换类名实现主题色切换。

```css
/* day样式主题 */
body.day .box {
  color: #f90;
  background: #fff;
}

/* dark样式主题 */
body.dark .box {
  color: #eee;
  background: #333;
}

.box {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
```

需要切换主题色时，使用JS更改 `body` 标签的类名即可。

## CSS变量 + 类名切换

定义好一系列的CSS变量，在需要进行主题色切换的位置都使用这些CSS变量而不是直接写死样式。当切换主题色的时候，更改CSS变量对应的具体颜色就能实现切换，更改CSS变量的方式就是类名切换。

```css
/* 定义根作用域下的变量 */
:root {
  --theme-color: #333;
  --theme-background: #eee;
}

/* 更改dark类名下变量的取值 */
.dark {
  --theme-color: #eee;
  --theme-background: #333;
}

/* 更改pink类名下变量的取值 */
.pink {
  --theme-color: #fff;
  --theme-background: pink;
}

.box {
  transition: all .2s;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  /* 使用变量 */
  color: var(--theme-color);
  background: var(--theme-background);
}
```

## v-bind

在 Vue3 的 `style` 标签中是可以使用 `v-bind` 这个指令的。因此，在编写样式时，在JS部分定义好几个主题色样式，然后通过 `v-bind` 将定义的颜色进行绑定，后续切换主题色时直接通过JS修改
`v-bind`绑定的值就好。

```vue

<script setup>
  // 这里可以是原始对象值，也可以是ref()或reactive()包裹的值，根据具体需求而定
  const theme = {
    color: 'red'
  }
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
  p {
    color: v-bind('theme.color');
  }
</style>
```

## CSS变量 + 动态setProperty

选择主题色中有一个不太常见的场景，如果说用户希望能够自己选择主题色而不是使用开发者预先设定的主题色，应该怎么做？
借助[CSSStyleDeclaration.setProperty](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)这个API就能实现这个功能。
基本实现思路也是先定义好CSS变量，然后调用上述API该CSS变量对应的颜色值更改为用户选择的颜色值即可。

```css
:root {
  --theme-color: #333;
  --theme-background: #eee;
}
```

```js
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
// 切换主题色
setCssVar('--theme-color', color)
```

## 总结

1. `link` 标签动态引入样式的方式对首屏性能影响小，但是在切换时可能会出现不流畅的问题。
2. 类名切换的方式提前加载样式，对首屏性能有更多影响，但可以实现更加丝滑的切换效果。
3. 支持用户自定义主题色的场景，需要 `setProperty` 更改CSS变量为用户自己选择的颜色。
