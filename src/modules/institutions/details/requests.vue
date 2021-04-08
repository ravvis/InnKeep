<template>
  <v-progress-linear
    v-if="$store.getters['Institutions/fetching_requests']"
    indeterminate
    color="green"
  ></v-progress-linear>
  <v-container v-else-if="get_requests && get_requests.length">
    <v-row>
      <v-radio-group v-model="requests_filter" row>
        <v-radio
          v-for="filter in Object.values(requests_filters_list)"
          :key="filter"
          color="accent"
          :label="`${filter}`"
          :value="filter"
          style="width:30%;"
        ></v-radio>
      </v-radio-group>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          outlined
          elevation="4"
          tile
          v-for="(request, index) in get_requests_to_show"
          :key="index"
          style="margin-bottom: 26px;"
        >
          <v-container>
            <v-row>
              <v-col cols="5">
                <v-card-title>
                  {{ request.type }}

                  <v-chip
                    class="ma-2"
                    :color="request.isOpen ? 'orange' : 'green'"
                    small
                  >
                    {{ request.isOpen ? "Open" : "Closed" }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle>
                  {{ request.desc }}
                </v-card-subtitle>
                <v-card-text>
                  <v-chip
                    class="my-2 mr-2"
                    color="blue"
                    small
                    v-if="request.resource"
                  >
                    {{ request.resource }}
                  </v-chip>
                </v-card-text>
                <v-chip class="ma-2" color="primary" label>
                  <v-icon left>
                    mdi-account-circle-outline
                  </v-icon>
                  Assignee: {{ request.assign_to || "NA" }}
                </v-chip>
                <!-- <v-divider vertical></v-divider> -->
              </v-col>
              <v-col cols="1">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="5">
                <v-chip class="ma-2" color="primary" label>
                  <v-icon left>
                    mdi-account-circle-outline
                  </v-icon>
                  Requester Information
                </v-chip>
                <v-card-title> Name: {{ request.name || "NA" }} </v-card-title>
                <v-card-subtitle>
                  Email: {{ request.email || "NA" }}
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-btn>
                  <router-link
                    :to="{
                      name: 'request-status',
                      params: {
                        id: request.request_id
                      }
                    }"
                  >
                    <v-icon>{{ icons.mdiShareOutline }}</v-icon>
                  </router-link>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-btn @click="openEditRequest({ request: request })" block
              >Edit</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-card v-if="!get_requests_to_show.length" outlined elevation="4" tile>
          <v-card-title>
            No {{ requests_filter }} requests found.
          </v-card-title>
        </v-card>
      </v-col>
      <edit-request
        v-if="edit_request.open"
        :request="edit_request.request"
        @close="closeEditRequest"
      ></edit-request>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditRequest from "@/modules/institutions/details/edit_request";
import { mdiShareOutline } from "@mdi/js";

export default {
  components: {
    EditRequest
  },
  data() {
    return {
      icons: {
        mdiShareOutline
      },
      edit_request: {
        open: false,
        request: null
      },
      timestamp: null,
      requests_filters_list: {
        open: "Open",
        closed: "Closed",
        all: "All"
      },
      requests_filter: "Open"
    };
  },
  mounted() {
    this.fetch_requests_of_institute();
    // setInterval(() => {
    //   console.log("helmo");
    //   this.fetch_requests_of_institute({ loading: false });
    // }, 7000);
  },
  methods: {
    ...mapActions("Institutions", ["fetch_requests_of_institute"]),
    openEditRequest({ request }) {
      this.$set(this, "edit_request", {
        open: true,
        request: request
      });
    },
    closeEditRequest(config = { reload: false }) {
      this.$set(this, "edit_request", {
        open: false,
        request: null
      });
      if (config.reload) {
        this.fetch_requests_of_institute();
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timestamp);
  },
  computed: {
    ...mapGetters("Institutions", ["get_requests"]),
    get_requests_to_show() {
      switch (this.requests_filter) {
        case this.requests_filters_list.open:
          return this.get_requests.filter(request => !!request.isOpen);

        case this.requests_filters_list.closed:
          return this.get_requests.filter(request => !request.isOpen);

        default:
          return this.get_requests;
      }
    }
  }
};
</script>

<style></style>
