<template>
  <v-container fluid>
    <v-row class="fill-height">
      <v-col>
        <v-list shaped>
          <v-subheader>INSTITUTIONS</v-subheader>
          <v-progress-linear
            v-if="fetching_institutions"
            indeterminate
            color="green"
          ></v-progress-linear>
          <v-list-item-group
            v-else
            color="accent"
            v-model="activeInstitutionDashboard"
          >
            <v-list-item
              v-for="(institution, i) in $store.getters[
                'AdminDashboard/get_institutions'
              ]"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="institution.name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("AdminDashboard/fetch_institutions");
  },
  computed: {
    ...mapGetters("AdminDashboard", ["fetching_institutions"]),
    activeInstitutionDashboard: {
      get() {
        return this.$store.getters["AdminDashboard/get_institutions"].findIndex(
          institution =>
            institution.institution_id ===
            this.$store.getters["AdminDashboard/active_institution_dashboard"]
        );
      },
      set(value) {
        console.log({ value });
        if (
          value >= 0 &&
          value < this.$store.getters["AdminDashboard/get_institutions"].length
        ) {
          this.$store.commit(
            "AdminDashboard/SET_ACTIVE_INSTITUTION_DASHBOARD",
            this.$store.getters["AdminDashboard/get_institutions"][value]
              .institution_id
          );
        }
      }
    }
  }
};
</script>

<style></style>
