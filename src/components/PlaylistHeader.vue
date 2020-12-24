<template>
  <div class="PlaylistHeader">
    <div
      :style="{ backgroundImage: `url('${info.coverImgUrl}')` }"
      class="mask"
    ></div>
    <div class="content">
      <div class="img_box">
        <img :src="info.coverImgUrl" alt=""/>
        <span>{{ info.playCount |format_quantity }}</span>
      </div>
      <div class="info_text">
        <span>{{ info.name }}</span>
        <span class="creator" v-if="gain_success">
          <img  :src="info.creator.avatarUrl" alt=""/>
          {{ info.creator.nickname }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistHeader',
  props: ['info', 'gain_success'],
  beforeRouteUpdate(to, from, next) {
    console.log(to,from)

    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
}
</script>

<style lang="less" scoped>
.PlaylistHeader {
  position: relative;
  overflow: hidden;
  min-height: 170px;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    //&:after {
    //  position: absolute;
    //  left: 0;
    //  top: 0;
    //  content: "";
    //  width: 110%;
    //  height: 110%;
    //  background: inherit;
    //  filter: blur(15px) brightness(0.9);
    //  z-index: -1;
    //}
  }

  .content {
    padding: 25px 20px;
    display: flex;

    .img_box {
      width: 120px;
      height: 120px;
      position: relative;

      span {
        position: absolute;
        right: 0;
        top: 0;
        color: white;
      }
    }

    .info_text {
      margin-left: 15px;
      display: flex;
      flex-flow: wrap column;
      justify-content: space-around;

      .creator {
        font-size: 12px;

        img {
          vertical-align: middle;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }

      span {
        max-width: 150px;
        color: white;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
