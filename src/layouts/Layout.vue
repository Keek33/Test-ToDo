<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getHeader();
  },
  methods: {
    getHeader() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
      } else {
        return {};
      }
    },
  },
};
</script>
