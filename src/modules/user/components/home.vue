<template>
  <v-main>
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12" v-if="!successMsg">
            <v-toolbar color="primary">
              <v-toolbar-title>Add Request</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-select
                  :items="resources"
                  label="Resource*"
                  v-model="resource"
                />

                <v-select
                  :items="services"
                  label="Service*"
                  v-model="service"
                />

                <v-text-field
                  ref="name"
                  v-model="name"
                  label="Name"
                  placeholder="Please enter your name"
                  required
                />

                <v-text-field
                  ref="email"
                  v-model="email"
                  label="Email"
                  placeholder="Please enter email"
                  required
                />

                <v-text-field
                  ref="desc"
                  v-model="desc"
                  label="Request Description"
                  placeholder="Enter descripton of request"
                  counter
                  required
                  @keydown.enter="login"
                />
              </v-form>
            </v-card-text>

            <v-layout column>
              <v-btn
                :disabled="!desc || loading || !resource || !service"
                :loading="loading"
                color="primary"
                @click="submit"
                data-testid="button-login"
                >Submit</v-btn
              >
              <v-spacer />
              <v-divider class="mt-5" />
            </v-layout>
          </v-card>
          <v-card v-else>
            <v-alert type="success" text>{{ successMsg }}</v-alert>
            <v-card-text>
              You can track you service request here 👉
              <router-link
                :to="{
                  name: 'request-status',
                  params: {
                    id: request_id
                  }
                }"
                style="color:yellow;"
              >
                {{ "Request status #" + request_id }}
              </router-link>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import firebase from "firebase";
import { GET_RANDOM_ID } from "@/resources/getRandomId.js";
import { mapGetters } from "vuex";
const db = firebase.firestore();
import axios from "axios";

export default {
  name: "add-request",
  data() {
    return {
      name: "",
      email: "",
      type: "",
      desc: "",
      institution_id: "",
      request_id: "",
      isOpen: "",
      loading: false,
      successMsg: "",
      resource: null,
      service: null
    };
  },
  mounted() {
    this.$store.dispatch("Institutions/fetch_resources_of_institute", {
      institution_id: this.$route.params.id
    });
    this.$store.dispatch("Institutions/fetch_services_of_institute", {
      institution_id: this.$route.params.id
    });
    this.request_id = GET_RANDOM_ID();
  },
  methods: {
    submit() {
      console.log(this.type);
      this.loading = true;
      db.collection("requests")
        .add({
          name: this.name,
          email: this.email,
          // type: this.type,
          desc: this.desc,
          isOpen: true,
          institution_id: this.$route.params.id,
          request_id: this.request_id,
          resource: this.resource,
          type: this.service
        })
        .then(async () => {
          // await sendEmail({
          //   to: this.email,
          //   subject: "Request created successfully",
          //   body_html: "Request created successfully"
          // });
          console.log(process.env.VUE_APP_SERVER_URL);
          axios.post(
            "send-notification",
            {
              to: "ravi16iiitg@gmail.com",
              subject: "Request created successfully",
              body_html: "Request created successfully",
              data: {
                url:
                  window.location.origin + "/request/status/" + this.request_id,
                create: true
              }
            },
            {
              baseURL: process.env.VUE_APP_SERVER_URL
            }
          );
          this.successMsg = "Request has been registered successfully!";
          console.log("Sucess!");
          this.loading = false;
        })
        .catch(error => {
          console.error("Error: ", error);
        });
    }
  },
  computed: {
    ...mapGetters("Institutions", ["get_resources", "get_services"]),
    resources() {
      return this.get_resources.map(resource => resource.title);
    },
    services() {
      return this.get_services.map(service => service.title);
    }
  }
};
</script>
