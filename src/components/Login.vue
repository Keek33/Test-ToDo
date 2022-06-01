<template>
  <div class="col-md-12 box_login">
    <div class="card card-container border-none">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card mt-8 width_8"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block my-5" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import * as yup from "yup";
const API_URL = "https://candidate.neversitup.com/todo/";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/show");
    }
  },
  methods: {
    async handleLogin(user) {
      this.loading = true;
      // this.$store.dispatch("auth/login", user).then(
      //   () => {
      //     this.$router.push("/show");
      //   },
      //   (error) => {
      //     this.loading = false;
      //     this.message =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //   }
      // );
      return axios
        .post(API_URL + "users/auth", {
          username: user.username,
          password: user.password,
        })
        .then((response) => {
          console.log(55555, response);
          if (response.data.token) {
            console.log(5555);
            localStorage.setItem("user", JSON.stringify(response.data));
            this.$router.push("/show");
          }
          return response.data;
        });
    },
  },
};
</script>
<style scoped>
.width_8 {
  text-align: center;
  width: 80px;
  border-radius: 50%;
  margin: auto;
  margin-top: 2%;
}
.box_login {
  width: 60%;
  margin: auto;
  margin-top: 5%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
}
Form {
  width: 85%;
  padding: 10% 0;
  margin: auto;
}
.border-none {
  border: none;
}
</style>
