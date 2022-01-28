<template>
  <v-container>
    <v-tabs
      class="login-tab"
      v-model="tab"
      show-arrows
      background-color="#2196f3"
      icons-and-text
      dark
      grow
    >
      <v-tabs-slider color="purple darken-4"></v-tabs-slider>
      <v-tab v-for="(i, index) in tabs" :key="index">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>

      <v-tab-item class="login-item">
        <v-form ref="loginForm" @submit.prevent="loginSubmit">
          <v-text-field
            v-model="login"
            :rules="loginRules"
            label="E-mail*"
          ></v-text-field>
          <v-text-field
            v-model="loginPassword"
            :rules="[rules.required, rules.min]"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password*"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            ref="pwd"
            @click:append="show3 = !show3"
          ></v-text-field>
          <v-btn
            :disabled="!isFormValid"
            color="success"
            class="mr-4"
            @click="loginSubmit"
            type="submit"
          >
            Войти
          </v-btn>
        </v-form>
      </v-tab-item>

      <v-tab-item class="register-item">
        <Register />
      </v-tab-item>
    </v-tabs>
    <LoadDialog :loadConfig="loadDialog" />
  </v-container>
</template>

<script>
import Register from "./Register.vue";
import LoadDialog from "./LoadDialog.vue";
import { login } from "../modules/login";
import { getUser } from "../modules/users";

export default {
  name: "Login",
  components: {
    Register,
    LoadDialog,
  },
  props: {
    isFormValid: Boolean,
  },
  data: () => ({
    loadDialog: false,
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    login: "",
    loginPassword: "",
    show3: false,
    loginRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  computed: {},

  methods: {
    async loginSubmit() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.change(false);
          this.loadDialog = true;
          await login(this.login, this.loginPassword)
            .then((response) => {
              localStorage["id"] = response.id;
              setTimeout(() => this.$router.push({ path: "/news" }), 2000);
              return response;
            })
            .catch((error) => {
              console.log(error);
              return error;
            });
          await getUser(localStorage.id).then((response) => {
            localStorage["firstName"] = response.first_name;
            localStorage["lastName"] = response.last_name;
            localStorage["email"] = response.email;
          });
        } catch (error) {
          this.change(true);
          this.loadDialog = false;
          this.$refs.pwd.reset();
          this.loginPassword = "";
          // TODO: This is where I have to handle the error.
          console.log(error);
          Promise.reject(error); // returning promise status.
        }
      }
    },
    change(value) {
      this.$emit("changeValue", value);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  align-items: center !important;
}
.login-tab {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.login-item {
  padding: 15px 25px;
}
.register-item {
  padding: 15px 25px;
}
</style>
