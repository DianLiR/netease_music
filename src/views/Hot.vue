<template>
  <div class="hot">
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
  name: "hot",
  components: { PlaylistHeader, SongItem },
  data() {
    return {
      hotSongId: 3778678,
      playInfo: {
        type: Object,
      },
      playCreator: {},
      playlist: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // if (localStorage.getItem("playInfo")) {
      //   this.playInfo = JSON.parse(localStorage.getItem("playInfo"));
      // } else {
      this.$loading()

      this.axios({
        method: "post",
        url: "http://music.kele8.cn/playlist/detail",
        data: {
          id: this.hotSongId,
        },
      })
        .then((res) => {
          // let play_info = JSON.stringify(res.data.playlist);
          // localStorage.setItem("playInfo", play_info);
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
            this.$loading.close()
            this.playlist = res.data.songs;
            console.log(this.playlist);
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.hot {
  .song_list {
    .title {
      background-color: #eeeff0;
      padding-left: 15px;
    }
  }
}
</style>
