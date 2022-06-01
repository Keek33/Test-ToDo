<template>
  <Layout>
    <div class="container">
      <div class="table">
        <div class="box" v-for="(item, index) in dataTodo" :key="index">
          <h1>{{ item.title }}</h1>
          <p>{{ item.description }}</p>
          <div class="gr_Btn">
            <button
              class="btn btn-warning p-0 px-2 py-1 mr-2 radius"
              @click="handleClickEditContent(item._id)"
            >
              Edit
            </button>
            <button
              @click="handleClickDeleteContent(item._id)"
              class="btn-delete radius"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="button_Create">
      <button @click="addData()" class="btn-primary p-0 px-2 py-2 mr-2 radius">
        Create
      </button>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/layouts/Layout.vue";
import axios from "axios";
const API_URL = "https://candidate.neversitup.com/todo/";
export default {
  name: "Show",
  data() {
    return {
      bareer: "",
      dataTodo: [],
    };
  },
  components: {
    Layout,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getHeader() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        return "Bearer " + JSON.parse(localStorage.getItem("user")).token;
      } else {
        return {};
      }
    },
    async loadData() {
      const config = {
        headers: {
          Authorization: this.getHeader(),
        },
      };

      await axios
        .get(API_URL + "todos", config)
        .then((res) => {
          this.dataTodo = res.data;
        })
        .catch((err) => {
          console.log(88888);
          alert(err.response.data.error.message);
        });
    },
    async handleClickDeleteContent(id) {
      var confirmDel = confirm("Are you sure you want to delete?");
      const config = {
        headers: {
          Authorization: this.getHeader(),
        },
      };

      if (confirmDel) {
        await axios
          .delete(API_URL + `todos/${id}`, config)
          .then((result) => {
            console.log(result);
            this.loadData();
          })
          .catch((err) => {
            alert(err.response.data.error.message);
          });
      }
    },
    async handleClickEditContent(id) {
      this.$router.push({
        path: "/edit",
        query: { id: id },
      });
    },
    async addData() {
      this.$router.push({
        path: "/add",
      });
    },
  },
};
</script>
<style scoped>
.table {
  margin-top: 10%;
}
.box {
  width: 80%;
  margin: auto;
  padding: 20px 30px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
}
.box p {
  font-size: 18px;
}
.btn-delete {
  background: red;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  color: white;
}
.gr_Btn {
  display: flex;
  justify-content: right;
}
.button_Create {
  text-align: center;
  margin: auth;
}
.radius {
  border-radius: 10px;
  border: none;
}
</style>
