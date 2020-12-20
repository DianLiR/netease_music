<template>
  <div class="play_header">
    <div class="left">
      <i
        class="iconfont icon-chexiao_huaban"
        @click="$emit('toggle-play-bar')"
      ></i>
      <div class="info">
        <slot>
          <span class="title">{{ songInformation.name }}</span>
          <span class="singer">
            <template v-for="(items, index) in playInfo">
              <template v-if="index">/</template>
              {{ items.name }}
            </template>
            <i class="iconfont" :class="ricon"></i>
          </span>
        </slot>
      </div>
    </div>
    <div class="right">
      <i class="iconfont icon-fenxiang_huaban"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayHeader",
  props: ["songInformation"],
  data() {
    return {
      ricon: {
        type: String,
        default: "icon-youjiantou_huaban",
      },
    };
  },
  computed: {
    playInfo() {
      let info = this.songInformation.ar || this.songInformation.song.artists;
      return info;
    },
  },
};
</script>

<style lang="less" scoped>
.play_header {
  display: flex;
  align-items: center;
  color: white;
  height: 50px;

  > div {
    > .iconfont {
      font-size: 24px;
    }
  }

  .left {
    flex: 3;
    overflow: hidden;
    .info {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      height: 50px;

      > p {
        line-height: 50px;
      }
      > span {
        width: 200px;
      }

      .title {
        letter-spacing: 2px;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .singer {
        font-size: 14px;
        color: #888;
        display: flex;
        align-items: center;

        i {
          font-size: 20px;
        }
      }
    }

    .icon-chexiao_huaban {
      float: left;
      width: 50px;
      line-height: 50px;
      text-align: center;
      display: block;
    }
  }

  .right {
    flex: 1;
    text-align: right;
    padding-right: 10px;
    .iconfont {
    }
  }
}
</style>
