<template>
  <span :class="{ paused: paused }" class="FreFrequencySmall">
    <i></i>
    <i></i>
    <i></i>
  </span>
</template>

<script>
export default {
  name: "FreFrequencySmall",
  props: ["paused"]
};
</script>

<style lang="less" scoped>
.FreFrequencySmall {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &.paused {
    i {
      animation-play-state: paused;
    }
  }

  i {
    width: 5px;
    height: 20px;
    transform-origin: center bottom;
    animation: identifier 0.5s linear -0.2s infinite alternate-reverse;

    &:last-of-type {
      animation-delay: 0s;
    }

    &:first-of-type {
      animation-delay: -0.1s;
    }
  }
}

@keyframes identifier {
  0% {
    transform: scaleY(1);
    background-color: Chartreuse;
  }
  50% {
    transform: scaleY(0.5);
    background-color: pink;
  }
  100% {
    transform: scaleY(0.1);
    background-color: skyblue;
  }
}
</style>
