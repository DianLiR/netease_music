<template>
  <div class="PlayChart">
    <div
      class="play_record"
      :class="{active:paused}"
      :style="{ backgroundImage: `url('${currentMusic.picUrl||currentMusic.al.picUrl}')` }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PlayChart",
  props: ["currentMusic", "paused"],
  created() {
    console.log(this.currentMusic);
  },
};
</script>

<style lang="less" scoped>
.PlayChart {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .play_record {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    animation: playing 15s linear infinite;
    &.active {
      animation-play-state: paused;
    }
  }
}
@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
