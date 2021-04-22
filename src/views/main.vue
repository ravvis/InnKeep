<template>
  <div>
    <v-app-bar color="secondary" height="64px" absolute elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img
          src="@/assets/images/logo_gold.svg"
          width="10px"
          height="10px"
        ></v-img>
        InnKeep
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-switch
        style="margin-top:16px;margin-right:24px;margin-bottom:auto;"
        v-model="darkTheme"
        :label="`Dark mode`"
        color="accent"
        inset
      ></v-switch>
      <v-btn
        style="margin-right:16px;"
        @click="$store.dispatch('open_create_institution_form')"
        v-if="is_authenticated"
        >Create Institution</v-btn
      >
      <v-btn @click="logout" v-if="is_authenticated">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer app floating v-if="is_authenticated" color="secondary">
      <v-card-title>
        <img
          src="@/assets/images/logo_gold.svg"
          width="40px"
          style="margin-right:8px;"
        />
        InnKeep
      </v-card-title>
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <create-institution
      v-if="$store.state.show_create_institution_form"
      @close="$store.dispatch('close_create_institution_form')"
    ></create-institution>
  </div>
</template>

<script>
import CreateInstitution from "@/modules/institutions/create/components/create_institution.vue";
import sidebar from "@/modules/admin-dashboard/components/sidebar.vue";
export default {
  components: { CreateInstitution, sidebar },
  computed: {
    is_authenticated() {
      return this.$store.getters["is_authenticated"];
    },
    darkTheme: {
      get() {
        return this.$store.state.theme.dark;
      },
      set(value) {
        console.log({ value });
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        return this.$store.commit("SET_DARK_THEME", value);
      }
    }
  },
  mounted() {
    this.check_authenticated();
  },
  methods: {
    logout() {
      this.$store.dispatch("AuthStore/logout", {});
    },
    check_authenticated() {
      if (
        !(
          this.$auth.is_authenticated() ||
          this.$route.name == "signin" ||
          this.$route.name == "signup"
        )
      ) {
        this.$router.push({ name: "signin" });
      }
    }
  }
};
</script>

<style></style>
