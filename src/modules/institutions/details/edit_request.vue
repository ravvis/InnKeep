<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog max-width="600" :value="true">
        <template v-slot:default>
          <v-card>
            <v-toolbar color="primary" dark>
              Edit Request
            </v-toolbar>
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
              <v-switch
                style="margin-left:24px;"
                v-model="local_request.isOpen"
                inset
                :label="local_request.isOpen ? 'Open' : 'Closed'"
                color="orange"
              ></v-switch>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="$emit('close')"
                style="margin-right:12px;"
                :disabled="saving"
                >Close
              </v-btn>
              <v-btn text @click="save" :loading="saving">Save</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { requestsCollection } from "@/firebase";
import axios from "axios";
export default {
  props: {
    request: {
      required: true
    }
  },
  data() {
    return {
      local_request: {
        isOpen: false
      },
      saving: false
    };
  },
  mounted() {
    if (this.request) {
      this.local_request.isOpen = JSON.parse(
        JSON.stringify(this.request.isOpen)
      );
    }
  },
  methods: {
    async save() {
      this.saving = true;
      let requests = await requestsCollection
        .where("request_id", "==", this.request.request_id)
        .get();
      console.log({ requests });
      let docs = [];
      requests.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        docs.push(doc);
      });
      if (docs && docs.length) {
        console.log({ docs });
        await docs[0].ref.update({
          isOpen: this.local_request.isOpen
        });
      }
      this.saving = false;
      this.$emit("close", { reload: true });
      axios.post(
        "send-notification",
        {
          to: "ravi16iiitg@gmail.com",
          subject: "Request resolved successfully",
          body_html: "Request resolved successfully",
          data: {
            url: window.location.origin + "/request/status/" + this.request_id,
            create: false
          }
        },
        {
          baseURL: process.env.VUE_APP_SERVER_URL
        }
      );
    }
  }
};
</script>

<style></style>
