<template>
  <div id="app" :class="{ bb: currentMusic && isShowBar }">
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      :currentIndex="currentIndex"
      @onclickPlayBar="isShowBar = !isShowBar"
      @update:paused="paused = $event"
      :PlayList="PlayList"
      @update:music="
          currentMusic = $event.item;
          currentIndex = $event.index;
        "
    />

    <HomeNav />
    <keep-alive>
      <router-view
        :currentMusic="currentMusic"
        :paused="paused"
        @update:PlayList="PlayList=$event"
        @update:music="
          currentMusic = $event.item;
          currentIndex = $event.index;
        "
      />
    </keep-alive>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Play from "@/components/Play.vue";
import HomeNav from "@/components/HomeNav.vue";

export default {
  components: {
    Play,
    HomeNav,
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      isShowBar: true,
      currentIndex:0,
      PlayList: [],
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bb {
  padding-bottom: 60px;
}
</style>
