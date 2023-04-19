<template>
  <div class="contain">
    <div class="login">
        <img src="../assets/img/login/tittle.png" alt="">
        <div class="middle">人员管理系统入口</div>
        <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.contain{
    width: 100%;
    height: 100vh;
    background: url('../assets/img/login/bg1.png');
    background-size: cover;
    position: relative;
}
.login{
    position: absolute;
    width: 30%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: aquamarine;
}
.top{
    height: 20%;
}
.middle{
    color: white;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 23px;
}
</style>