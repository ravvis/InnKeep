<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-progress-linear
            v-if="fetching_request"
            indeterminate
            color="green"
          ></v-progress-linear>
          <v-container v-else-if="get_request">
            <v-row>
              <v-col>
                <v-toolbar-title style="font-size:32px;">
                  Request <span style="pacity:0.8;">#{{ get_request.request_id }}</span>
                </v-toolbar-title>

                <v-row>
                  <v-col>
                    <v-card-title>
                      {{ get_request.type }}

                      <v-chip
                        class="ma-2"
                        :color="get_request.isOpen ? 'orange' : 'green'"
                        small
                      >
                        {{ get_request.isOpen ? "Open" : "Closed" }}
                      </v-chip>
                    </v-card-title>
                    <v-card-subtitle>
                      {{ get_request.desc }}
                    </v-card-subtitle>
                    <v-card-text>
                      <v-chip
                        class="my-2 mr-2"
                        color="blue"
                        small
                        v-if="get_request.resource"
                      >
                        {{ get_request.resource }}
                      </v-chip>
                    </v-card-text>
                    <v-chip class="ma-2" color="primary" label >
                      <v-icon left>
                        mdi-account-circle-outline
                      </v-icon>
                      Assignee: {{ get_request.assign_to || "NA" }}
                    </v-chip>
                  </v-col>
                  <v-col>
                    <v-divider vertical></v-divider>
                  </v-col>
                  <v-col>
                    <v-chip class="ma-2" color="primary" label>
                      <v-icon left>
                        mdi-account-circle-outline
                      </v-icon>
                      Requester Information
                    </v-chip>
                    <v-card-title>
                      Name: {{ get_request.name || "NA" }}
                    </v-card-title>
                    <v-card-subtitle>
                      Email: {{ get_request.email || "NA" }}
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.fetch_request(this.$route.params.id);
  },
  computed: {
    ...mapGetters("Institutions", ["get_request", "fetching_request"])
  },
  methods: {
    ...mapActions("Institutions", ["fetch_request"])
  }
};
</script>
