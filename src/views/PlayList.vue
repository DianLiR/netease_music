<template>
  <div class="playlist">
<!--    <div class="header">-->
<!--      <div class="left_icon"><i class="iconfont icon-chexiao_huaban"></i></div>-->
<!--      <div class="title">歌单</div>-->
<!--    </div>-->
    <PlaylistHeader
      :gain_success="gain_success"
      :info="playInfo"
    ></PlaylistHeader>
    <div class="song_list">
      <div class="title">歌曲列表</div>
      <ul>
        <SongItem
          v-for="(item, index) in playlist"
          :key="item.id"
          :currentMusic="$attrs.currentMusic"
          :index="index"
          :isShowIndex="true"
          :item="item"
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
      gain_success: false,
    };
  },
  watch: {
    $route: {
      handler: function () {
        this.playlist = "";
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
      this.$loading();

      this.playInfo = "";
      this.axios({
        method: "get",
        // url: "http://music.kele8.cn/playlist/detail",
        url: "/playlist/detail",
        params: {
          id: this.playId,
        },
      })
        .then((res) => {
          this.$loading.close();

          // console.log(res);
          this.gain_success = true;
          this.playInfo = res.data.playlist;
          // this.playCreator = res.data.playlist.creator
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

<style lang="less" scoped>
.header {
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left_icon{
    border: 1px solid #000;
  }
  .title  {
    border: 1px solid #000;
  }
}
</style>
