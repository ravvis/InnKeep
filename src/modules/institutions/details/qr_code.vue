<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog max-width="600" :value="true">
        <template v-slot:default>
          <v-card>
            <v-toolbar color="primary" dark>
              QR Code
            </v-toolbar>
            <v-card-title>
              Scan this QR Code to submit a service request.
            </v-card-title>
            <v-card-text>
              <div style="display:flex;alig-items:center;">
                <vue-qrcode
                  :value="request_form_link"
                  ref="request_form_link"
                  :width="300"
                />
                <v-btn
                  text
                  @click="download_qr_code"
                  style="margin-left:32px;margin-right:32px;"
                >
                  <v-icon style="margin-right:8px;">{{
                    icons.mdiDownloadCircleOutline
                  }}</v-icon>
                  Download
                </v-btn>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="$emit('close')" style="margin-right:12px;"
                >Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import VueQrcode from "vue-qrcode";
import { mdiDownloadCircleOutline } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiDownloadCircleOutline
      }
    };
  },
  props: {
    request_form_link: {},
    institute_name: {}
  },
  components: {
    VueQrcode
  },
  computed: {
    fileName() {
      return `${this.institute_name}-QR-CODE.png`;
    }
  },
  methods: {
    download_qr_code() {
      console.log({ ref: this.$refs.request_form_link.dataUrl });
      const linkSource = this.$refs.request_form_link.dataUrl;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = this.fileName;
      downloadLink.click();
    }
  }
};
</script>
