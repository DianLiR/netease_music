<template>
  <div class="Search">
    <div class="search_bar">
      <i class="iconfont icon-sousuo_huaban"></i>
      <input type="text" v-model.trim="SearchValue" placeholder="搜索歌曲" />
    </div>
    <div class="popular_searches" v-if="isShowDefault">
      <h2>热门搜索</h2>
      <ul>
        <li
          v-for="(item, index) in hots"
          :key="index"
          @click="SearchValue = item.first"
        >
          {{ item.first }}
        </li>
      </ul>
    </div>
    <div class="result_searches" v-else>
      <h2>搜索结果</h2>
      <ul>
        <!--         v-for="(item,index) in NewSong"-->
        <!--        :key="item.id"-->
        <!--        :index="index"-->
        <!--        :isShowIndex="false"-->
        <!--        :item="item"-->
        <!--        :currentMusic="$attrs.currentMusic"-->
        <!--        :paused="$attrs.paused"-->
        <!--        @update:music="$emit('update:music', $event)"-->
        <!--        @update:PlayList="$emit('update:PlayList', NewSong)"-->
        <song-item
          v-for="(item, index) in SearchList"
          :key="item.id"
          :index="index"
          :is-show-index="false"
          :item="item"
          :current-music="$attrs.currentMusic"
          :paused="$attrs.paused"
          @update:PlayList="$emit('update:PlayList', SearchList)"
          @update:music="$emit('update:music', $event)"
        ></song-item>
      </ul>
    </div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import _ from "lodash";
export default {
  name: "Search",
  components: { SongItem },
  data() {
    return {
      isShowDefault: true,
      SearchValue: "",
      hots: {
        type: Array,
      },
      SearchList: "",
    };
  },
  watch: {
    SearchValue() {
      console.log(_.debounce);
        this.SearchList = "";
        this.isShowDefault=true
      if (this.SearchValue != "") {
        this.DebounceGetDtaa();
      }
    },
  },
  created() {
    this.info();
    this.DebounceGetDtaa = _.debounce(this.search, 500);
  },
  methods: {
    info() {
      this.axios({
        method: "post",
        url: "/search/hot",
      }).then((res) => {
        // console.log(res.data.result.hots);
        this.hots = res.data.result.hots;
      });
    },
    search() {
      this.axios({
        method: "get",
        url: "http://keuaile75.top:3000/cloudsearch",
        params: {
          limit: 20,
          keywords: this.SearchValue,
        },
      }).then((res) => {
        this.isShowDefault=false
        this.SearchList = res.data.result.songs;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Search {
  .search_bar {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f2f3f4;
    .icon-sousuo_huaban {
      position: absolute;
      color: #ccc;
      left: 30px;
    }
    input {
      padding-left: 25px;
      width: 90%;
      height: 30px;
      border-radius: 15px;
      outline: none;
      border: none;
      background-color: #ebecec;
    }
  }
  .popular_searches {
    width: 100%;
    padding: 0 10px;
    h2 {
      color: #747774;
      padding: 5px;
    }
    ul {
      //justify-content: space-between;
      li {
        display: inline-block;
        height: 32px;
        margin: 0 8px 8px 0;
        border-radius: 15px;
        padding: 0 10px;
        font-size: 14px;
        line-height: 32px;
        box-shadow: 0 0 0 1px #ccc;
        //border: 1px solid #000;
      }
    }
  }
}
</style>
