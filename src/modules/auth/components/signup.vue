<template>
  <v-main>
    <v-container style="margin-top:12%" md3 fluid>
      <v-layout justify-center align-content-center>
        <v-flex xs12 sm12 md6>
          <v-card class="elevation-12">
            <v-toolbar>
              <v-toolbar-title>Signup</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                    v-model="name"
                    prepend-icon="mdi-account"
                    name="name"
                    label="Name"
                    type="text"
                  />
                  <v-text-field
                    v-model="company"
                    prepend-icon="mdi-home"
                    name="company"
                    label="Company Name"
                    type="text"
                  />
                <v-text-field
                  ref="username"
                  v-model="email"
                  :rules="[() => !!email || 'This field is required']"
                  prepend-icon="mdi-account"
                  label="Email"
                  placeholder="Email"
                  required
                />
                <v-text-field
                  ref="password"
                  v-model="password"
                  :rules="[() => !!password || 'This field is required']"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  label="Password"
                  placeholder="*********"
                  counter
                  required
                  @keydown.enter="login"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
           
            <v-layout column align-center>
              <div class="text-xs-center">
                <v-btn
                  :disabled="!email || !password"
                  :loading="loading"
                  color="success"
                  width="40px"
                  @click="onSignUp"
                  data-testid="button-login"
                  >Sign Up</v-btn
                >
              </div>
              <v-spacer />
              <v-divider class="mt-5" />
              <p>
               Got an account?
                    <router-link :to="{ name: 'signin' }">Login here</router-link>
              </p>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>


 <script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: "",
      company: "",
      email: "",
      password: "",
      errorMessages: "Incorrect login info",
      showPassword: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail is invalid"
      ]
    };
  },
  computed: {
    ...mapGetters("AuthStore", ["get_user", "loading"])
  },
  mounted() {
    if (this.$auth.is_authenticated()) {
      this.$router.push({ name: "home" });
    }
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.$router.replace({ name: "home" });
      }
    }
  },
  methods: {
    ...mapActions("AuthStore", ["signUp"]),
    onSignUp() {
      this.signUp({
        name: this.name,
        company: this.company,
        email: this.email,
        password: this.password
      });
    }
  }
};

 </script>
