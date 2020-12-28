<template>
  <div class="Play-Footer">
    <div class="progress_bar_box">
      <span class="currentTime">{{ currentTime | FormatTime }}</span>

      <div class="progress_bar">
        <input
          :max="duration"
          :value="currentTime"
          min="0"
          step="1"
          type="range"
          @input="get_value"
        />
        <span
          :style="{ width: (currentTime / duration) * 100 + '%' }"
          class="move_point"
        ></span>
      </div>
      <span class="duration">{{ duration | FormatTime }}</span>
    </div>
    <div class="play_control">
      <span
        :class="isRandom ? 'icon-hanhan-01-011' : 'icon-hanhan-01-012'"
        class="iconfont"
        @click="$emit('update:isRandom')"
      ></span>
      <span
        class="iconfont icon-shangyishou_huaban"
        @click="$emit('toggleSong', 'true')"
      ></span>
      <span
        :class="paused ? 'icon-bofang_huaban1' : 'icon-zanting_huaban1'"
        class="iconfont fs"
        @click="togglePlay"
      ></span>
      <span
        class="iconfont icon-xiayishou_huaban"
        @click="$emit('toggleSong', 'false')"
      ></span>
      <span class="iconfont icon-wenzhang_huaban"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayFooter',
  props: ['currentTime', 'duration', 'paused', 'isRandom'],
  methods: {
    get_value(e) {
      this.$emit('update:currentTime', e.target.value)
    },
    togglePlay() {
      this.$emit('toggle_play')
    },
  },
  filters: {
    FormatTime(v) {
      let h = Math.floor(v / 3600)
      let m = Math.floor((v / 60) % 60)
      let s = Math.floor(v % 60)
      h = h <= 0 ? '' : h < 10 ? '0' + h + ':' : h + ':'
      m = m < 10 ? '0' + m + ':' : m + ':'
      s = s < 10 ? '0' + s : s
      return h + m + s
    },
  },
  data: function () {
    return {
      icon_s: [
        {
          info: 'order',
          icon: 'icon-hanhan-01-011',
          fn: function () {
            console.log('aaa')
          },
        },
        {
          info: 'previous_song',
          icon: 'icon-shangyishou_huaban',
        },
        {
          info: 'status',
          icon: 'icon-bofang_huaban1',
        },
        {
          info: 'next_song',
          icon: 'icon-xiayishou_huaban',
        },
        {
          info: 'list',
          icon: 'icon-wenzhang_huaban',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.Play-Footer {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;

  .progress_bar_box {
    display: flex;
    margin: 0 auto;
    width: 80%;
    height: 20px;
    align-items: center;

    & > span {
      font-size: 12px;
      color: white;
    }

    .progress_bar {
      width: 70%;
      height: 6px;
      position: relative;
      top: 0;
      left: 0;
      background-color: #767b7d;
      margin: 0 auto;
      border-radius: 4px;

      input {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }

      .move_point {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: #fff;
        border-radius: 4px;

        &:before {
          position: absolute;
          top: -50%;
          right: -6px;
          display: block;
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
  }

  .play_control {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-between;

    > span {
      line-height: 50px;
      color: white;
      text-align: center;
      font-size: 24px;
      width: 100px;
      height: 50px;

      &.fs {
        font-size: 42px;
      }
    }
  }
}
</style>
