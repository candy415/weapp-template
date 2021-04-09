<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 用于获取微信公众号授权,本地开发页面时,可以先不引入
// import authMixin from './mixin/auth';
// export default {
//   mixins: [authMixin]
// }
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
