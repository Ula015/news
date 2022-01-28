<template>
  <div class="news-item">
    <template v-if="this.returnLength()">
      <v-app-bar color="blue" height="65px" dense dark fixed>
        <v-spacer></v-spacer>
        <v-toolbar-title> About news </v-toolbar-title>
        <v-spacer></v-spacer>
        <LogOut />
      </v-app-bar>

      <v-card class="mx-auto item-card" max-width="75%" min-height="600">
        <v-img :src="news.urlToImage" height="300px"></v-img>
        <v-card-title class="card-author">
          Author: {{ news.author }}</v-card-title
        >
        <v-card-subtitle>
          {{ news.source.name || news.source }}
        </v-card-subtitle>
        <v-card-title class="card-title"> {{ news.title }} </v-card-title>
        <v-card-title class="card-content"> {{ news.content }} </v-card-title>
        <v-card-title class="card-description">
          {{ news.description }}
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle>
          {{ news.publishedAt }}
        </v-card-subtitle>
        <EditItem :news="this.news" />
      </v-card>

      <div class="news-comments">
        <div class="comments-outside">
          <div class="comments-header">
            <div class="comments-stats">
              <span>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="pink"
                  @click="likesCount()"
                >
                  <v-icon dark> mdi-heart </v-icon>
                </v-btn>
                {{ likes }}
              </span>
              <span>
                <v-icon large color="blue darken-2"> mdi-message-text </v-icon>
                {{ comments.length }}
              </span>
            </div>
            <div class="post-owner">
              <div class="avatar">
                <img :src="creator.avatar" alt="" />
              </div>
              <div class="username">
                <a>@{{ creator.user }}</a>
              </div>
            </div>
          </div>
          <Comments
            :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
            :comments="comments"
            :current_user="current_user"
            @submit-comment="submitComment"
          ></Comments>
        </div>
      </div>
    </template>
    <Notification />
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";
import LogOut from "../components/LogOut.vue";
import EditItem from "../components/news/EditItem.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "NewsItemPage",
  props: {
    news: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Comments,
    LogOut,
    EditItem,
    Notification,
  },
  created() {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("my_app_token")) {
      this.$router.push({ path: "/" });
      return;
    }

    if (!this.returnLength()) {
      this.$router.push({ path: "/news" });
    }
    this.creator.user = localStorage.firstName;
    this.current_user.user = localStorage.firstName;
  },
  data: () => ({
    likes: 8,
    hasLiked: false,
    creator: {
      avatar: "http://via.placeholder.com/100x100/a74848",
      user: "User",
    },
    current_user: {
      avatar: "http://via.placeholder.com/100x100/a74848",
      user: "User",
    },
    comments: [
      {
        id: 1,
        user: "Azamat",
        avatar: "http://via.placeholder.com/100x100/a74848",
        text: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ",
      },
      {
        id: 2,
        user: "Dauren",
        avatar: "http://via.placeholder.com/100x100/2d58a7",
        text: "lorem ipsum dolor",
      },
      {
        id: 3,
        user: "Alisher",
        avatar: "http://via.placeholder.com/100x100/36846e",
        text: "lorem ipsum dolor again",
      },
    ],
  }),
  methods: {
    submitComment: function (reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply,
      });
    },
    likesCount() {
      if (!this.hasLiked) {
        this.likes += 1;
        this.hasLiked = true;
      }
    },
    returnLength() {
      return Object.keys(this.news).length;
    },
  },
  computed: {},
};
</script>

<style scoped>
.news-item {
  min-height: 100%;
}
.item-card {
  margin: 100px 0px 0px 0px;
}
.card-author {
  font-size: 16px;
}
.card-content {
  font-size: 18px;
}
.card-title {
  font-size: 25px;
  font-weight: bold;
}
.news-comments {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ececec;
  margin: 1em 0;
  padding: 0;
}
.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 75%;
}
.comments-header {
  background-color: #c8c8c8;
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #333;
  min-height: 80px;
  font-size: 20px;
}
.comments-header .comments-stats span {
  margin-left: 10px;
}
.post-owner {
  display: flex;
}
.post-owner .avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.post-owner .username {
  margin-left: 5px;
}
.post-owner .username > a {
  color: #333;
}
</style>
