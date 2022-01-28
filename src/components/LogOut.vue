<template>
  <v-container fluid class="container">
    <v-row justify="center">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="42">
              <span class="white--text text-h7">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar class="avatar-in" color="brown">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click.stop="dialog = true">
                Add news
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logOut()"> Log Out </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
    <AddForm :visible="dialog" @close="dialog = false" />
  </v-container>
</template>

<script>
import AddForm from "@/components/news/AddForm.vue";

export default {
  name: "LogOut",
  components: {
    AddForm,
  },
  data: () => ({
    user: {
      initials: "UU",
      fullName: "User User",
      email: "email",
    },
    dialog: false,
  }),
  mounted() {
    this.userInfo();
  },
  computed: {
    userInfo() {
      return this.getUserInfo;
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem("my_app_token");
      localStorage.removeItem("email");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("id");
      this.$router.push({ path: "/" });
    },
    getUserInfo() {
      this.user.fullName = localStorage.firstName + " " + localStorage.lastName;
      this.user.initials = localStorage.firstName[0] + localStorage.lastName[0];
      this.user.email = localStorage.email;
    },
  },
};
</script>

<style scoped>
.container {
  width: 0;
}
.avatar-in {
  margin-bottom: 7px;
}
</style>
