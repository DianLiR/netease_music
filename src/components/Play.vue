<template>
  <div :class="{ paused: paused }" class="play_box">
    <audio
      ref="audio"
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      autoplay
    ></audio>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
      name="custom-classes-transition"
    >
      <div v-show="isShowPlayBar" class="play" @click="onclickPlayBar">
        <div class="left">
          <div class="img_b">
            <!--            <img :src="currentMusic.picUrl || currentMusic.al.picUrl" alt="" />-->
            <img :src="playImgUrl" alt="" />
          </div>
          <div class="text">
            <p class="title">{{ currentMusic.name }}</p>
            <!-- <p class="singer">{{ currentMusic }}</p> -->
            <p class="singer">
              <span v-for="(items, index) in playInfo" :key="index">
                <template v-if="index">/</template>
                {{ items.name }}
              </span>
            </p>
          </div>
        </div>
        <div class="right">
          <div class="play_btn" @click.stop="togglePaused">
            <canvas ref="circle" height="50" width="50"></canvas>
            <span
              :class="[paused ? 'icon-bofang_huaban' : 'icon-zanting_huaban']"
              class="icon iconfont"
            ></span>
          </div>
          <div class="next_btn" @click.stop="toggleSong(true)">
            <span class="iconfont icon-xiayishou_huaban1"></span>
          </div>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
      name="custom-classes-transition"
    >
      <div v-if="!isShowPlayBar" class="Play_window">
        <div
          :style="{ backgroundImage: `url('${playImgUrl}')` }"
          class="mask"
        ></div>
        <play-header
          :songInformation="currentMusic"
          @toggle-play-bar="isShowPlayBar = true"
        >
        </play-header>
        <div class="content_box">
          <play-chart
            v-show="!isShowLyric"
            :currentMusic="currentMusic"
            :paused="paused"
            @click.native="isShowLyric = !isShowLyric"
          ></play-chart>
          <play-lyric
            v-show="isShowLyric"
            :lyric="lyric"
            :rollingDistance="rollingDistance"
            @update:currentTime="$refs.audio.currentTime = $event"
            @click.native="isShowLyric = !isShowLyric"
          ></play-lyric>
          <!--          <play-lyric
                      v-show="isShowLyric"
                      :lyric="lyric"
                      :currentTime="currentTime"
                      @update:currentTime="$refs.audio.currentTime = $event"
                      @click.native="isShowLyric = !isShowLyric"
                    ></play-lyric>-->
        </div>
        <play-footer
          :currentTime="currentTime"
          :duration="duration"
          :paused="paused"
          @toggleSong="toggleSong"
          @toggle_play="togglePaused"
          @update:currentTime="$refs.audio.currentTime = $event"
        ></play-footer>
      </div>
    </transition>
  </div>
</template>
<script>
import PlayHeader from "./PlayBox/PlayHeader.vue";
import PlayChart from "@/components/PlayBox/PlayChart";
import PlayLyric from "@/components/PlayBox/PlayLyric";
import PlayFooter from "@/components/PlayBox/PlayFooter";

export default {
  components: { PlayFooter, PlayLyric, PlayChart, PlayHeader },
  name: "Play",
  props: ["currentMusic", "currentIndex", "PlayList"],

  data() {
    return {
      paused: false,
      duration: 0,
      currentTime: 0,
      isShowLyric: false,
      isShowPlayBar: true,
      lyric: "",
      rollingDistance: "",
    };
  },
  computed: {
    playImgUrl() {
      // let url = this.currentMusic.picUrl || this.currentMusic.al.picUrl;
      // console.log(url);
      return this.currentMusic.picUrl || this.currentMusic.al.picUrl;
    },
    playInfo() {
      // let info = this.currentMusic.ar || this.currentMusic.song.artists;
      return this.currentMusic.ar || this.currentMusic.song.artists;
    },
  },

  watch: {
    paused(newVal) {
      this.$emit("update:paused", newVal);
    },
    // currentMusic: {
    //   deep: true,
    //   handler() {
    //     this.paused = false;
    //     console.log("currentMusic更改");
    //   },
    // },
  },
  mounted() {
    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      console.log("暂停");
      this.paused = true;
    });
    audio.addEventListener("play", () => {
      console.log("播放");
      this.paused = false;
    });
    audio.addEventListener("durationchange", () => {
      this.lyric = "";
      this.getLyric();
      this.duration = audio.duration;
    });
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      this.drawCircle(this.currentTime, this.duration);
      this.lyrics_scroll(this.currentTime);
    });
    audio.addEventListener("ended", () => {
      this.toggleSong(true);
    });
  },
  methods: {
    onclickPlayBar() {
      this.$emit("onclickPlayBar");
      this.isShowPlayBar = false;
    },
    togglePaused() {
      const music = this.$refs.audio;
      if (music.paused) {
        music.play();
      } else {
        music.pause();
      }
      // this.paused = !this.paused;
    },
    //绘制圆形方法
    drawCircle(n, t) {
      let canvas = this.$refs.circle;
      let context = canvas.getContext("2d");
      context.clearRect(0, 0, 50, 50);
      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = 1; //设置线条宽度
      context.arc(25, 25, 20, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();

      context.beginPath();
      context.strokeStyle = "skyblue";
      context.lineWidth = 2;
      context.arc(
        25,
        25,
        20,
        Math.PI * -0.5,
        Math.PI * ((n / t) * 2 - 0.5),
        false
      );
      context.stroke();
      context.closePath();
    },

    calculateNext() {
      let NextIndex;
      if (this.currentIndex < this.PlayList.length - 1) {
        NextIndex = this.currentIndex + 1;
      } else {
        NextIndex = 0;
      }
      return NextIndex;
    },
    calculatePrevious() {
      let NextIndex;
      NextIndex = this.currentIndex - 1;
      if (this.currentIndex <= 0) {
        NextIndex = this.PlayList.length - 1;
      }
      return NextIndex;
    },
    toggleSong(PorN) {
      let index;
      if (PorN) {
        index = this.calculateNext();
      } else {
        index = this.calculatePrevious();
      }
      this.$emit("update:music", {
        item: this.PlayList[index],
        index,
      });
    },

    // PlayNextSong() {
    //   // console.log("下一首");
    //   let index = this.calculateNext();
    //   this.$emit("update:music", {
    //     item: this.PlayList[index],
    //     index,
    //   });
    // },
    // previous_song() {
    //   let index = this.calculatePrevious();
    //   this.$emit("update:music", {
    //     item: this.PlayList[index],
    //     index,
    //   });
    // },

    getLyric() {
      // console.log(this.currentMusic.name, this.currentMusic.id);
      this.axios({
        url: "/lyric",
        method: "get",
        params: {
          id: this.currentMusic.id,
        },
      }).then((res) => {
        console.log("获取成功");
        // console.log(res);
        let lyric = res.data.lrc.lyric;
        let regular_verification = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
        this.lyric = lyric
          .split("\n")
          .filter((e) => e)
          .map((item, index) => {
            let time = item
              .match(regular_verification)[0]
              .replace(/(\[|\])/gi, "");
            let timeList = time.split(":");
            time = Number(timeList[0]) * 60 + Number(timeList[1]);
            let text = item.replace(regular_verification, "");
            return { time, text, index };
          });
        // console.log(l_arr)
        // this.lyric = l_arr;
        // console.log(this.lyric);
      });
    },
    lyrics_scroll(v) {
      if (this.lyric) {
        this.rollingDistance = this.lyric.findIndex((item) => {
          return item.time > v;
        });
        // this.rollingDistance = i;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.play_box {
  // &.paused {
  // 	.play {
  // 	}
  // }

  // border-top: 1px solid #cccccc8f;
  .play {
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: white;
    height: 60px;

    display: flex;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .left {
      flex: 5;
      display: flex;

      .img_b {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .text {
        margin-left: 10px;
        display: flex;
        text-align: left;
        justify-content: space-around;
        flex-flow: wrap column;

        .title {
          max-width: 200px;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .singer {
          color: #888;
          font-size: 12px;
        }
      }
    }

    .right {
      width: calc(50px * 2);
      display: flex;
      flex: 1;

      .play_btn {
        //border: 1px solid #000;
        width: 50px;
        height: 50px;
        position: relative;

        span.icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 50px;
          font-size: 24px;
        }
      }

      .next_btn {
        width: 50px;
        height: 50px;
        //border: 1px solid #000;
        line-height: 50px;
        text-align: center;

        > .iconfont {
          font-size: 2.5em;
          color: #888;
        }
      }
    }
  }

  .Play_window {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #ccc;
      //background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      z-index: -2;
      filter: blur(1px) brightness(0.5);

      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 110%;
        height: 110%;
        background: inherit;
        filter: blur(15px);
        z-index: -1;
      }
    }
  }

  .content_box {
    height: calc(100% - 70px * 2);
  }
}
</style>
.
