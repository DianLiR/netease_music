<template>
  <li class="playlistitem" @click="RedirectToPlaylist(item.id)">
    <div class="Image_area">
      <img :src="item.picUrl" alt="" />
<!--      <span>{{ item.playCount | FormatPlayback }}</span>-->
      <span>{{ item.playCount | format_quantity }}</span>
    </div>
    <h5>{{ item.name }}</h5>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    FormatPlayback(v) {
      return "♫ " + (v / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    RedirectToPlaylist(id) {
      // console.log(this.item);
      this.$router.push({
        name: "PlayList",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.playlistitem {
  flex: 1 1 calc(100% / 6 - 20px);
  font-size: 14px;
  margin: 0 5px 10px 5px;
  // &:nth-of-type(3n) {
  // 	// margin-right: 5px;
  // }
  .Image_area {
    position: relative;

    img {
      min-height: 30vw;
      vertical-align: middle;
      border-radius: 3px;
    }

    span {
      position: absolute;
      right: 2px;
      top: 2px;
      color: #ffffff;
      text-shadow: 0 0 1px #000;
    }
  }

  h5 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 3px;
  }
}
</style>
