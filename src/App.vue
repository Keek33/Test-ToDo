<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark bg_blue">
      <a href="/" class="navbar-brand">Keek33</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/array" class="nav-link">Array</router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item hover">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      // this.$store.dispatch("auth/logout");
      localStorage.setItem("user", "");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.hover {
  cursor: pointer;
}
.bg_blue {
  background-color: rgb(31, 200, 219);
  background-image: linear-gradient(
    141deg,
    rgb(159, 184, 173) 0%,
    rgb(31, 200, 219) 51%,
    rgb(44, 181, 232) 75%
  );
}
</style>
>
