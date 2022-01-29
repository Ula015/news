<template>
  <div class="reg-form">
    <v-form ref="registerForm">
      <small style="color: red">* indicates required field</small>
      <v-text-field
        v-model="email"
        class="custom-label-color"
        label="E-mail*"
        placeholder="email@mail.ru"
        required
        :rules="registerRules"
      ></v-text-field>
      <v-text-field
        v-model="registerPassword"
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Password*"
        hint="At least 8 characters"
        value="wqfasds"
        class="input-group--focused custom-label-color"
        @click:append="show3 = !show3"
      ></v-text-field>
      <v-text-field
        label="Nickname*"
        class="custom-label-color"
        v-model="nickname"
        required
        :rules="someRules"
      ></v-text-field>
      <v-text-field
        v-model="firstName"
        class="custom-label-color"
        label="First name*"
        :rules="someRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        class="custom-label-color"
        label="Last name*"
        required
        :rules="someRules"
      ></v-text-field>
      <v-select
        v-model="gender"
        class="custom-label-color"
        :items="items"
        :rules="someRules"
        label="Gender*"
        required
      ></v-select>
      <v-autocomplete
        v-model="country"
        class="custom-label-color"
        label="Country*"
        :items="countryItems"
        required
        :rules="someRules"
      >
      </v-autocomplete>
      <v-autocomplete
        v-model="city"
        class="custom-label-color"
        @focus="cityList"
        label="City*"
        required
        :rules="someRules"
        :items="cityItems"
      >
      </v-autocomplete>
      <v-text-field
        v-model="phone"
        class="custom-label-color"
        v-mask="'+7 (###) ###-####'"
        placeholder="(702) 000-0000"
        label="Phone*"
        required
        :rules="someRules"
      >
      </v-text-field>
      <v-text-field
        v-model="date"
        class="custom-label-color"
        label="Date of birth*"
        v-mask="'##-##-####'"
        placeholder="01-01-2021"
        required
        :rules="someRules"
      >
      </v-text-field>
      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
      <v-btn color="success" class="mr-4" @click="submit"> submit </v-btn>
    </v-form>
    <LoadDialog :loadConfig="loadDialog" />
  </div>
</template>

<script>
import { signUp } from "../modules/register";
import { day, month, year, phoneNumber } from "../helpers/dateFormatting";
import { mapFields } from "vuex-map-fields";
import { mapGetters, mapActions } from "vuex";
import LoadDialog from "./LoadDialog.vue";

export default {
  name: "Register",
  components: {
    LoadDialog,
  },
  data: () => ({
    loadDialog: false,
    checkbox: false,
    email: "",
    registerPassword: "",
    nickname: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    country: "",
    city: "",
    date: "",
    show3: false,
    password: "Password",
    registerRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    someRules: [(value) => !!value || "Required."],
    items: ["Male", "Female"],
    cityItems: [],
  }),
  computed: {
    ...mapFields({ countryName: "country" }, { cityName: "city" }),
    ...mapGetters("locations", ["countriesList"]),
    ...mapGetters("locations", ["citiesList"]),
    countryItems() {
      return this.countriesList;
    },
    ...mapGetters("locations", ["countryInput"]),
    ...mapGetters("locations", ["cityInput"]),
  },

  methods: {
    async submit() {
      if (this.$refs.registerForm.validate()) {
        try {
          this.loadDialog = true;
          setTimeout(() => (this.loadDialog = false), 3000);
          await signUp(
            this.email,
            this.registerPassword,
            this.nickname,
            this.firstName,
            this.lastName,
            phoneNumber(this.phone),
            this.gender,
            this.city,
            this.country,
            day(this.date),
            month(this.date),
            year(this.date)
          );
          this.$refs.registerForm.reset();
          this.resetInputs();
          setTimeout(() => {
            this.$router.go({ path: "/" });
          }, 2500);
        } catch (error) {
          this.loadDialog = false;
          console.log(error);
          Promise.reject(error);
        }
      }
    },
    ...mapActions("locations", ["fetchCities"]),
    cityList() {
      this.fetchCities(this.country);
      setTimeout(this.getCityList, 1500);
    },
    getCityList() {
      this.cityItems = this.citiesList;
    },
    resetInputs() {
      this.email = "";
      this.registerPassword = "";
      this.nickname = "";
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.gender = "";
      this.city = "";
      this.country = "";
      this.date = "";
    },
  },
};
</script>

<style scoped>
.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}

.custom-label-color .v-label {
  color: red;
  opacity: 1;
}

.custom-placeholer-color input,
.custom-label-color input {
  color: red !important;
}
</style>
