<template>
  <v-row justify="center">
    <v-btn color="success" class="edit-btn" @click="editItemContent()">
      <v-icon left> mdi-pencil </v-icon>
      Edit
    </v-btn>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit news</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="setItemContent()"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <small class="small-text">* indicates required field</small>
            <v-form class="add-from" ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.author"
                    outlined
                    class="ma-0 pa-0"
                    label="Author*"
                    rows="1"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.source"
                    outlined
                    class="ma-0 pa-0"
                    label="Source*"
                    rows="1"
                    :rules="nameRules"
                    ref="name"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.title"
                    outlined
                    class="ma-0 pa-0"
                    label="Title*"
                    rows="2"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.content"
                    outlined
                    class="ma-0 pa-0"
                    rows="7"
                    name="input-7-4"
                    label="Content*"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.description"
                    outlined
                    class="ma-0 pa-0"
                    rows="7"
                    name="input-7-4"
                    label="Description*"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditItem",
  props: {
    news: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
    valid: true,
    newsData: {
      author: "",
      content: "",
      description: "",
      source: "",
      title: "",
      id: "",
    },
    nameRules: [(v) => !!v || "Required!"],
    newObj: {},
  }),
  methods: {
    ...mapActions("news", ["setItem"]),
    editItemContent() {
      this.dialog = true;
      this.newsData.author = this.news.author;
      this.newsData.content = this.news.content;
      this.newsData.description = this.news.description;
      this.newsData.source = this.news.source.name;
      this.newsData.title = this.news.title;
      this.newsData.id = this.news.id;
    },
    setItemContent() {
      console.log(this.newsData);
      this.setItem(this.newsData);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.edit-btn {
  margin: 15px;
}
.small-text {
  color: red;
  font-size: 16px;
}
.v-card__text {
  margin-top: 20px;
}
.container {
  margin-top: 20px;
}
.row {
  margin-top: 10px;
}
</style>
