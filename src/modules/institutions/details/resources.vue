<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="openAddResource">Add New Resource</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-progress-linear
        v-if="$store.getters['Institutions/fetching_resources']"
        indeterminate
        color="green"
      ></v-progress-linear>
      <v-container v-else-if="get_resources && get_resources.length">
        <v-row>
          <v-col>
            <v-chip class="ma-2" color="blue" small>
              Total Available Resources: {{ get_resources.filter(resource => resource.is_available).length }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card
              outlined
              elevation="4"
              tile
              v-for="(resource, index) in get_resources"
              :key="index"
              style="margin-bottom: 26px;"
            >
              <div
                style="display:flex;justify-content:space-between;align-items:center;margin-right:32px;"
              >
                <div>
                  <v-card-title>
                    {{ resource.title }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ resource.desc }}
                  </v-card-subtitle>
                </div>
                <div>
                  <v-switch
                    style="margin-left:24px;"
                    inset
                    :label="resource.is_available ? 'Available' : 'Unavailable'"
                    v-model="resource.is_available"
                    :true-value="false"
                    :false-value="true"
                    @change="v => setIsAvailable(resource, v)"
                    color="green"
                    :id="'resource-is-available-toggle-' + resource.resource_id"
                  ></v-switch>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <create-resource
      v-if="create_resource.open"
      @close="closeAddResource"
    ></create-resource>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateResource from "@/modules/institutions/details/create_resource";
import { resourcesCollection } from "@/firebase";
export default {
  components: {
    CreateResource
  },
  data() {
    return {
      create_resource: {
        open: false
      },
      timestamp: null
    };
  },
  mounted() {
    this.fetch_resources_of_institute();
    // setInterval(() => {
    //   console.log("helmo");
    //   this.fetch_resources_of_institute({ loading: false });
    // }, 7000);
  },
  methods: {
    ...mapActions("Institutions", ["fetch_resources_of_institute"]),
    openAddResource() {
      console.log("mnbnm,mnbnmn");
      this.$set(this, "create_resource", {
        open: true
      });
    },
    closeAddResource(config = { reload: false }) {
      this.$set(this, "create_resource", {
        open: false
      });
      if (config.reload) {
        this.fetch_resources_of_institute();
      }
    },
    async setIsAvailable(resource, v) {
      console.log("set is available");
      let resources = await resourcesCollection
        .where("resource_id", "==", resource.resource_id)
        .get();
      console.log({ resources });
      let docs = [];
      resources.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        docs.push(doc);
      });
      if (docs && docs.length) {
        console.log({ docs });
        await docs[0].ref.update({
          is_available: v
        });
      }
      this.fetch_resources_of_institute();
    }
  },
  computed: {
    ...mapGetters("Institutions", ["get_resources"])
  },
  beforeDestroy() {
    clearInterval(this.timestamp);
  }
};
</script>

<style></style>
