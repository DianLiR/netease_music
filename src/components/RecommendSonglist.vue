<template>
  <div>
    <BoxTitle>
      <slot></slot>
    </BoxTitle>
    <div class="ul_box">
      <ul>
        <PlayListItem
          v-for="(item, index) in currentRecommends"
          :key="index"
          :item="item"
        ></PlayListItem>
      </ul>
    </div>
  </div>
</template>

<script>
import BoxTitle from "../components/BoxTitle.vue";
import PlayListItem from "@/components/Playlistitem.vue";

export default {
  props: {
    currentRecommends: {
      type: Array
    }
  },
  components: {
    BoxTitle,
    PlayListItem
  }
};
</script>

<style lang="less" scoped>
.ul_box {
  &::-webkit-scrollbar {
    display: none;
  }

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ul {
    width: calc(120px * 6 + 20px);
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
