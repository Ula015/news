<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click.stop="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add news</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit"> Add </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <small class="small-text">* indicates required field</small>
            <v-form class="add-from" ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    class="ma-0 pa-0"
                    v-model="newsData.author"
                    label="Author*"
                    outlined
                    rows="1"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.source.name"
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
                    class="ma-0 pa-0"
                    label="Title*"
                    outlined
                    rows="2"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.content"
                    label="Content*"
                    outlined
                    class="ma-0 pa-0"
                    rows="7"
                    name="input-7-4"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newsData.description"
                    label="Description*"
                    outlined
                    class="ma-0 pa-0"
                    rows="7"
                    name="input-7-4"
                    :rules="nameRules"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <div style="flex: 1 1 auto"></div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddForm",
  data: () => ({
    dialog: false,
    valid: true,
    nameRules: [(v) => !!v || "Required!"],
    newsData: {
      author: "",
      content: "",
      description: "",
      source: {
        name: "",
      },
      title: "",
    },
  }),
  methods: {
    ...mapActions("news", ["addNews"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.addNews({ ...this.newsData });
        this.$emit("close");
      }
    },
    getName() {
      return this.source.name;
    },
  },
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>

<style scoped>
.add-news {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.small-text {
  color: red;
  font-size: 16px;
}
.v-card__text {
  margin-top: 10px;
}
.container {
  padding: 30px 10px;
}
.row {
  margin-top: 10px;
}
</style>
