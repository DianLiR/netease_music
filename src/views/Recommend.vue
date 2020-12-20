<template>
  <div class="recommend">
    <RecommendSonglist :currentRecommends="recommends">
      推荐歌单
    </RecommendSonglist>
    <LatestMusic
      :NewSong="NewSong"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      @update:PlayList="$emit('update:PlayList', $event)"
      @update:music="$emit('update:music', $event)"
    >
      最新音乐
    </LatestMusic>
  </div>
</template>

<script>
import RecommendSonglist from "../components/RecommendSonglist.vue";
import LatestMusic from "../components/LatestMusic.vue";

export default {
  name: "Recommend",
  components: {
    RecommendSonglist,
    LatestMusic,
  },
  data() {
    return {
      recommends: [],
      NewSong: [],
      recIndex: 0,
      count: 0,
    };
  },
  created() {
    this.axios.get("/personalized?limit=12").then((res) => {
      this.recommends = res.data.result;
    });
    this.axios.get("/personalized/newsong").then((res) => {
      this.NewSong = res.data.result;
    });
  },
  computed: {
    // currentRecommends() {
    // return this.recommends.slice(0, 12);
    // },
  },
};
</script>

<style lang="less" scoped></style>
