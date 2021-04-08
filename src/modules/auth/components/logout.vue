<template>
  <div>
    Logging out...
  </div>
</template>

<script>
import Auth from "../auth";
export default {
  async mounted(){
    await Auth.logout();
    // window.location.reload();
    // this.$router.push({
    //   name: "signin"
    // });
  }
}
</script>