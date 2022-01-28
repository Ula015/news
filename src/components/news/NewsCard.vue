<template>
  <div class="news-card">
    <v-card class="mx-auto d-flex flex-column" max-width="280" min-height="380">
      <router-link
        style="text-decoration: none"
        :to="{
          name: 'NewsItemPage',
          params: { news },
        }"
      >
        <v-img :src="news.urlToImage" height="200px"></v-img>
        <v-card-title>
          <div class="card-title">
            {{ news.title }}
          </div>
        </v-card-title>
      </router-link>
      <v-card-subtitle>
        <div class="card-title">
          {{ news.source.name || news.source }}
        </div>
      </v-card-subtitle>
      <v-card-actions>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="delete-btn" color="error" v-bind="attrs" v-on="on">
              Delete
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h9 delete-dialog">
              Are you sure you want to delete the news?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                No
              </v-btn>
              <v-btn color="green darken-1" text @click="deleteItem(news.id)">
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewsCard",
  data: () => ({
    dialog: false,
  }),
  props: {
    news: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions("news", ["deleteItemFromList"]),
    deleteItem(id) {
      this.dialog = false;
      this.deleteItemFromList(id);
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 14px;
  line-height: 20px;
  padding: 10px 10px 0px 10px;
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-card__actions {
  padding-top: 35px;
}
.news-card {
  text-decoration: none;
}
.v-card__actions {
  padding-left: 15px;
}
.delete-dialog {
  font-size: 10px;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 7px;
}
</style>
