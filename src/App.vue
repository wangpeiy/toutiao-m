<template>
  <div>
    <p>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </p>
    <div class="container">123</div>
  </div>
</template>

<script>
// rem适配

// 1.让rem动起来
// yarn add amfe-flexible
// 2.盒子使用rem
// 自动的识别css中px,并将其转成rem.

// post-css css的预处理器
// - postcss 自己能干的事很少，下载插件

// l.下载yarn add postcss-pxtorem
// 2.告诉postcss,我要使用这个插件.postcssrc.js
export default {}
</script>

<style>
.container {
  background-color: yellow;
  width: 700px;
  height: 88px;
}
</style>
