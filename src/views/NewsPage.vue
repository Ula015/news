<template>
  <div class="news-page">
    <template v-if="this.$route.name === 'NewsPage'">
      <v-app>
        <div class="app-bar">
          <v-app-bar color="blue" dark height="65px" app dense fixed>
            <v-spacer></v-spacer>
            <v-toolbar-title>Breaking News</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="log-out">
              <LogOut />
            </div>
          </v-app-bar>
        </div>

        <div class="content-section">
          <div class="search-news-section">
            <v-form
              class="search-form"
              ref="registerForm"
              @submit.prevent="submit"
            >
              <v-select
                v-model="countrySelect"
                :items="countryItem"
                item-text="name"
                item-value="value"
              ></v-select>
              <v-select
                v-model="categorySelect"
                :items="categoryItem"
                label="Choose category"
                item-value="business"
              ></v-select>
              <v-text-field
                label="Search text..."
                v-model="search"
              ></v-text-field>
              <v-btn color="success" class="mr-4" type="submit" @click="submit">
                Search
              </v-btn>
            </v-form>
          </div>

          <div class="news-section">
            <v-main>
              <v-container fluid>
                <div class="news-cards">
                  <template v-if="!isEmpty">
                    <v-row id="itemList">
                      <v-col
                        v-for="(item, index) in itemsForList"
                        :key="index"
                        cols="12"
                        sm="6"
                      >
                        <NewsCard :news="item" />
                      </v-col>
                    </v-row>
                    <b-pagination
                      v-model="currentPage"
                      class="mt-16"
                      :total-rows="this.getNewsLength"
                      :per-page="perPage"
                      aria-controls="itemList"
                      align="center"
                    ></b-pagination>
                  </template>
                  <template v-else>
                    <div class="no-news">
                      <v-alert class="alert-msg" elevation="5">
                        No news
                      </v-alert>
                    </div>
                  </template>
                  <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    left
                    color="primary"
                    @click="toTop"
                  >
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                </div>
              </v-container>
            </v-main>
          </div>
        </div>
      </v-app>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
    <Notification />
  </div>
</template>

<script>
import NewsCard from "@/components/news/NewsCard.vue";
import Notification from "@/components/Notification.vue";
import LogOut from "@/components/LogOut.vue";
// import NewsPagination from "@/components/NewsPagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewsPage",
  data: () => ({
    perPage: 4,
    rows: 30,
    currentPage: 1,
    fab: false,
    countrySelect: "us",
    categorySelect: "business",
    search: "",
    countryItem: [
      {
        value: "us",
        name: "United states",
      },
      {
        value: "ua",
        name: "Ukraina",
      },
    ],
    categoryItem: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
    ],
  }),
  components: {
    NewsCard,
    LogOut,
    Notification,
    // NewsPagination,
  },

  created() {
    if (!localStorage.getItem("my_app_token")) {
      this.$router.push({ path: "/" });
      return;
    }
    // this.$router.push({ path: "/" });
  },

  computed: {
    initNews() {
      return this.$store.dispatch("initNews");
    },
    ...mapGetters("news", ["newsList", "getNewsLength"]),
    isEmpty() {
      return Boolean(!Object.keys(this.newsList).length);
    },

    itemsForList() {
      const from = this.currentPage * this.perPage - this.perPage;
      const to = this.currentPage * this.perPage;
      return Object.keys(this.newsList)
        .slice(from, to)
        .reduce((result, key) => {
          result[key] = this.newsList[key];
          return result;
        }, {});
    },
    getNewsLength() {
      return Object.keys(this.newsList).length;
    },
  },

  methods: {
    ...mapActions("news", ["setCountry", "setCategory", "setSearchText"]),
    getTopHeadlinesNews() {
      this.setCountry(this.countrySelect);
      this.setCategory(this.categorySelect);
      this.initNews;
    },
    getEveryNews() {
      this.initNews;
    },
    submit() {
      if (!this.search) {
        this.setSearchText("");
        this.getTopHeadlinesNews();
      } else {
        this.setSearchText(this.search);
        this.getEveryNews();
      }
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style scoped>
.app-bar {
  margin-bottom: 50px;
}
.v-card {
  min-height: 100%;
}
.news-page {
  min-height: 100%;
}
.search-news-section {
  height: 270px;
  padding: 2px 20px;
  margin-top: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.content-section {
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.alert-msg {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
}
.news-cards {
  max-width: 800px;
  margin: 0 auto;
}
</style>
