<template>
  <Layout>
    <div class="container">
      <div class="Group_Box">
        <div class="box_Input">
          <h1>Array</h1>
          <div class="box">
            <h5>Array1 : {{ dataArray1 }}</h5>
            <h5>Array2 : {{ dataArray2 }}</h5>
            <h5>Array2 : {{ sum }}</h5>
          </div>
          <div class="button">
            <button
              class="btn btn-warning p-0 px-4 py-2 mr-2"
              @click="process()"
            >
              Process
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
export default {
  components: {
    Layout,
  },
  data() {
    return {
      id: "",
      dataArray1: [1, 2, 3, 4],
      dataArray2: [2, 4, 5, 6],
      sum: [],
    };
  },
  mounted() {},
  methods: {
    async backMenu() {
      this.$router.push({
        path: "/show",
      });
    },
    process() {
      // console.log(55555, this.dataArray.slice(1));
      var sumData = [];
      this.dataArray1.forEach((element1) => {
        this.dataArray2.forEach((element2) => {
          if (element1 == element2) {
            sumData.push(element1);
          }
        });

        this.sum = sumData;
      });
      // var newArray = this.dataArray1.concat(this.dataArray2);
      // console.log(newArray, "55555 jaa");
      // this.sum = Array.from(new Set(array));

      // this.sum = this.dataArray.slice(1);
      // this.dataArray = this.sum;
      // this.dataArray.slice(1);
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
