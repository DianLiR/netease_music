<template>
  <div class="playlist">
    <PlaylistHeader
      :info="playInfo"
      :creator="playCreator"
      :playlist="playlist"
    ></PlaylistHeader>
    <div class="song_list">
      <div class="title">歌曲列表</div>
      <ul>
        <SongItem
          v-for="(item, index) in playlist"
          :key="item.id"
          :index="index"
          :isShowIndex="true"
          :item="item"
          :currentMusic="$attrs.currentMusic"
          :paused="$attrs.paused"
          @update:music="$emit('update:music', $event)"
          @update:PlayList="$emit('update:PlayList', playlist)"
        ></SongItem>
      </ul>
    </div>
  </div>
</template>

<script>
import PlaylistHeader from "@/components/PlaylistHeader";
import SongItem from "@/components/SongItem";
export default {
  name: "playlist",
  components: { PlaylistHeader, SongItem },
  data() {
    return {
      playInfo: {
        type: Object,
      },
      playCreator: {},
      playlist: [],
      playId: "",
    };
  },
  watch: {
    $route: {
      handler: function () {
        this.playId = this.$route.params.id;
        this.init();
      },
      // 深度观察监听
      deep: true,
    },
  },
  // computed: {
  //   "this.$route.params.id"(){
  //     // this.playId
  //   },
  // },
  created() {
    this.playId = this.$route.params.id;
    this.init();
  },
  methods: {
    init() {
      // console.log(this.playId);
      this.axios({
        method: "get",
        // url: "http://music.kele8.cn/playlist/detail",
        url: "/playlist/detail",
        params: {
          id: this.playId,
        },
      })
        .then((res) => {
          // console.log(res);
          this.playInfo = res.data.playlist;
          this.playCreator = res.data.playlist.creator;
          return res.data.playlist.trackIds
            .slice(0, 20)
            .map((e) => e.id)
            .join();
        })
        .then((res) => {
          this.axios({
            method: "get",
            url: "/song/detail",
            params: {
              ids: res,
            },
          }).then((res) => {
            this.playlist = res.data.songs;
            // console.log(res);
            // console.log(this.playlist);
          });
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
