<template>
  <ul class="HomeNav">
    <li><router-link :to="{ name: 'Recommend' }">推荐音乐</router-link></li>
    <li><router-link :to="{ name: 'Hot' }">热歌榜</router-link></li>
    <li><router-link :to="{ name: 'Search' }">搜索</router-link></li>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.HomeNav {
  display: flex;
  height: 40px;
  position: sticky;
  top: 0;
  z-index: 8;
  background-color: white;

  li {
    flex: 1;
    text-align: center;

    a {
      display: inline-block;
      text-decoration: none;
      color: black;
      line-height: 40px;
      -webkit-tap-highlight-color: transparent;

      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}
</style>
