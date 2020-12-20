<template>
  <div class="PlayLyric">
    <div class="lyric_box">
      <ul :style="{ top: lyric_style + 'px' }">
        <li
          v-for="(item, index) in lyric"
          :key="item.index"
          :class="[index == rollingDistance - 1 ? 'active' : '']"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayLyric",
  props: ["lyric", "rollingDistance"],
  computed: {
    lyric_style() {
      let a = -30 * (this.rollingDistance - 1) + 150;
      // console.log(a);
      return a;
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
      color: white;
      line-height: 30px;
      margin-top: 50%;
      transition: top 1s;
      li {
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        transition: all 1s;
        font-size: 14px;
        &.active {
          color: red;
          //font-size: 16px;
        }
      }
    }
  }
}
</style>
