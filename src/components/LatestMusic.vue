<template>
  <!-- 最新音乐__盒子 -->
  <div>
    <box-title>
      <slot></slot>
    </box-title>
    <ul>
      <song-item
        v-for="(item,index) in NewSong"
        :key="item.id"
        :index="index"
        :isShowIndex="false"
        :item="item"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        @update:music="$emit('update:music', $event)"
        @update:PlayList="$emit('update:PlayList', NewSong)"
      ></song-item>
    </ul>
  </div>
</template>

<script>
import BoxTitle from './BoxTitle.vue'
import SongItem from './SongItem.vue'

export default {
  props: {
    NewSong: {
      type: Array
    },
  },
  components: { BoxTitle, SongItem }
}
</script>
