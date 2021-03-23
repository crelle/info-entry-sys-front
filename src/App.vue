<template>
  <div>
    <div id="nav">
      <span>家庭百科系统更改</span>
      <!-- <router-link to="/">家庭百科系统</router-link>|
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
