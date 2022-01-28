<template>
  <div class="login-page d-flex">
    <template v-if="!this.getToken()">
      <Login
        :isFormValid="isFormValid"
        @changeValue="changeValueOfButton($event)"
      />
      <Notification />
    </template>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "LoginPage",
  data: () => ({
    isFormValid: true,
  }),
  components: {
    Login,
    Notification,
  },
  created() {
    this.$store.dispatch("initLocations");
    if (this.getToken()) {
      this.$router.push({ path: "/news" });
      return;
    }
  },
  methods: {
    getToken() {
      return localStorage.getItem("my_app_token");
    },
    changeValueOfButton(value) {
      this.isFormValid = value;
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100%;
  align-items: center;
  background: url("../assets/images/city.jpg") center / cover no-repeat;
}
</style>
