<template>
  <div ref="lyric" class="PlayLyric">
    <div class="lyric_box">
      <ul
        ref="ul"
        :style="{ top: current_distance + 'px' }"
        @touchend="touchend"
        @touchmove="touchmove"
        @touchstart="touchstart"
      >
        <li
          v-for="(item, index) in lyric"
          :key="item.index"
          :class="[index == rollingDistance - 1 ? 'active' : '']"
        >
          {{ item.text||'-----------' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayLyric",
  props: ["lyric", "rollingDistance"],
  // props: ["lyric", "currentTime"],
  data() {
    return {
      slide_y: 0, //按下距离
      touching: false, //是否在触摸
      sliding_distance: 0, //滑动距离
      current_distances: Number,
    };
  },
  computed: {
    current_distance() {
      let top_distance = 0;

      if (this.rollingDistance == -1) return;
      // this.rollingDistance = i;
      if (this.$refs.lyric) {
        let h = this.$refs.lyric.offsetHeight / 2;
        console.dir(h);
        top_distance = -30 * (this.rollingDistance - 1) + h;
      }
      return top_distance;
    },
  },
  watch: {
    sliding_distance (newValue) {
      const ul = this.$refs.ul;
      if (this.rollingDistance == -1) return;
      if (this.$refs.lyric) {
        let h = this.$refs.lyric.offsetHeight / 2;
        console.dir(h);
        ul.style.top = -30 * (this.rollingDistance + newValue) + h + "px";
      }
    },
  },
  methods: {
    touchstart(e) {
      this.touching = true;
      this.slide_y = e.touches[0].clientY;
    },
    touchmove(e) {
      this.sliding_distance = Math.floor(
        (this.slide_y - e.touches[0].clientY) / 30
      );
      // console.log(this.slide_y)
    },
    touchend() {
      this.touching = false;
      // console.log(this.rollingDistance, this.slide_y, this.sliding_distance)
      let point_in_time = this.lyric[
        this.rollingDistance + this.sliding_distance
      ].time;
      // console.log(point_in_time)
      this.$emit("update:currentTime", point_in_time);
    },
  },
};
</script>

<style lang="less" scoped>
.PlayLyric {
  height: 100%;
  overflow: hidden;

  .lyric_box {
    position: relative;
    height: 100%;
    width: 80%;
    margin: 0 auto;


    ul {
      width: 100%;
      position: absolute;
      color: gray;
      //margin-top: 50%;
      //transition: top 1s;
      //line-height: 30px;
      top: 50%;

      li {
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        transition: all 1s;
        font-size: 14px;
        height: 30px;

        &.active {
          color: white;
          //font-size: 16px;
        }
      }
    }
  }
}
</style>
