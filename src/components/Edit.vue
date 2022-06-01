<template>
  <Layout>
    <div class="container">
      <div class="Group_Box">
        <div class="box_Input">
          <h1>Edit Data</h1>
          <div class="box">
            <p>Title :</p>
            <input type="text" v-model="dataTodo.title" placeholder="edit me" />
          </div>
          <div class="box">
            <span>Description :</span>
            <p style="white-space: pre-line">{{ message }}</p>
            <textarea
              v-model="dataTodo.description"
              placeholder="add multiple lines"
            ></textarea>
          </div>
          <div class="button">
            <button
              class="btn btn-success p-0 px-4 py-2 mr-2"
              @click="initialUpdateItem()"
            >
              Update
            </button>
            <button
              class="btn btn-warning p-0 px-4 py-2 mr-2"
              @click="backMenu()"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout.vue";
import axios from "axios";
const API_URL = "https://candidate.neversitup.com/todo/";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      id: "",
      dataTodo: [],
    };
  },
  mounted() {
    this.initialGetItem();
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
    async initialGetItem() {
      this.id = this.$route.query.id;
      // if (!id) return $router.go(-1);
      const config = {
        headers: {
          Authorization: this.getHeader(),
        },
      };

      await axios
        .get(API_URL + `todos/${this.id}`, config)
        .then((res) => {
          this.dataTodo = res.data;
          console.log(this.dataTodo, "data jaa");
        })
        .catch((err) => {
          console.log(88888);
          alert(err.response.data.error.message);
        });
    },
    async initialUpdateItem() {
      this.id = this.$route.query.id;
      if (!this.id) return;
      if (!this.dataTodo.title) return alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
      if (!this.dataTodo.description) return alert("กรุณาใส่ข้อมูลให้ครบถ้วน");

      const config = {
        headers: {
          Authorization: this.getHeader(),
        },
      };

      await axios
        .put(API_URL + `todos/${this.id}`, this.dataTodo, config)
        .then((res) => {
          this.dataTodo = res.data;
          this.$router.push({
            path: "/show",
          });
        })
        .catch((err) => {
          console.log(88888);
          alert(err.response.data.error.message);
        });
    },
    async backMenu() {
      console.log(55555);
      this.$router.push("/add");
    },
  },
};
</script>

<style scoped>
.Group_Box {
  margin-top: 7%;
}
.box_Input {
  max-width: 50%;
  margin: auto;
}
.box_Input h1 {
  text-align: center;
}
input[type="text"],
.test select {
  width: 100%;
  margin: 8px 0;
  margin-bottom: 15px;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
.button {
  margin-top: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
