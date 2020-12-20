<template>
  <li
    @click="
      $emit('update:music', { item, index });
      $emit('update:PlayList');
    "
  >
    <!--歌单页面调用后设置下标↓-->
    <div class="song_index" v-if="isShowIndex">{{ index + 1 }}</div>
    <div class="info">
      <h4>{{ item.name }}</h4>
      <p>
        <!--        <template v-if="isShowIndex">-->
        <!--          <span v-for="(items, index) in song_information" :key="index">-->
        <!--            <template v-if="index"> / </template>-->
        <!--            {{ items.name }}-->
        <!--          </span>-->
        <!--        </template>-->
        <!--        <template v-else>-->
        <span v-for="(items, index) in song_information" :key="index">
          <template v-if="index"> / </template>
          {{ items.name }}
        </span>
        <!--        </template>-->
        <!--        - {{ item.name }}-->
      </p>
    </div>
    <div class="icon">
      <fre-frequency-small
        v-if="currentMusic && currentMusic.id === item.id"
        :paused="paused"
      ></fre-frequency-small>
      <span v-else class="iconfont icon-bofang_huaban1"></span>
    </div>
  </li>
</template>

<script>
import FreFrequencySmall from "./FreFrequencySmall.vue";

export default {
  components: { FreFrequencySmall },
  props: ["item", "currentMusic", "paused", "isShowIndex", "index"],
  created() {
    // console.log(this.item);
  },
  computed: {
    song_information() {
      let info = this.item.ar || this.item.artists || this.item.song.artists
      return info;
    },
  },
};
</script>

<style lang="less" scoped>
li {
  display: flex;
  //justify-content: space-between;
  padding: 6px 5px 6px 0;
  margin-left: 5px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .song_index {
    font-size: 24px;
    width: 40px;
    color: #888;
    text-align: center;
  }
  &:last-of-type {
    border-bottom: none;
  }

  .info {
    h4 {
      max-width: 200px;
      font-weight: bold;
      font-size: 17px;
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    p {
      font-size: 14px;
      color: #888;
    }
  }

  .icon {
    margin-right: 10px;
    margin-left: auto;
    display: flex;
    align-items: center;
    width: 20px;

    .iconfont {
      font-size: 24px;
    }
  }
}
</style>
