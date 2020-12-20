<template>
  <div class="PlaylistHeader">
    <div
      class="mask"
      :style="{ backgroundImage: `url('${info.coverImgUrl}')` }"
    ></div>
    <div class="content">
      <div class="img_box">
        <img :src="info.coverImgUrl" alt="" />
        <span>{{ info.playCount |format_quantity}}</span>
      </div>
      <div class="info_text">
        <span>{{ info.name }}</span>
        <span class="creator">
          <img :src="creator.avatarUrl" alt="" />
          {{ creator.nickname }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistHeader",
  props: ["info", "creator"],
};
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
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: -2;
    //filter: blur(15px);
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      width: 110%;
      height: 110%;
      background: inherit;
      filter: blur(15px) brightness(0.9);
      z-index: -1;
    }
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
