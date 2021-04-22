<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog max-width="600" :value="true">
        <template v-slot:default>
          <v-card>
            <v-toolbar color="primary" dark>
              New Resource
            </v-toolbar>
            <v-card-text>
              <div>
                <v-text-field
                  label="Title*"
                  hide-details="auto"
                  v-model="form.title"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="form.desc"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="$emit('close')"
                style="margin-right:12px;"
                :disabled="saving"
                >Close
              </v-btn>
              <v-btn
                text
                @click="save"
                :disabled="saving || is_save_disabled"
                :loading="saving"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { resourcesCollection } from "@/firebase";
import { GET_RANDOM_ID } from "@/resources/getRandomId";
export default {
  data() {
    return {
      saving: false,
      form: {
        title: null,
        desc: null
      }
    };
  },
  computed: {
    is_save_disabled() {
      return !this.form.title;
    }
  },
  mounted() {
    console.log("here...........");
  },
  methods: {
    save() {
      this.saving = true;
      resourcesCollection
        .doc()
        .set({
          title: this.form.title,
          desc: this.form.desc,
          institution_id: this.$store.getters["Institutions/get_institute_id"],
          resource_id: GET_RANDOM_ID()
        })
        .then(() => {
          console.log("Document successfully written!");
          this.$toast.success(
            `Resource ${this.form.title} created successfully`
          );
          this.$emit("close", { reload: true });
        })
        .catch(error => {
          console.error("Error writing document: ", error);
          this.saving = false;
        });
    }
  }
};
</script>

<style></style>
