<template>
  <div>
    <div id="button">
      <b-button variant="primary" href="/">Back Home</b-button>
    </div>
    <div id="banner">
      <h1>Survey {{ this.surveyName }}</h1>
    </div>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <div v-for="item in items" :key="item.type" v-if="item.type == 'qcm'">
      <h3>
        <span style="font-size: 50px">&#127774;</span
        ><b><u> Multi Choice Question </u></b>
      </h3>

      <h3>
        <i>{{ item.label }}</i>
      </h3>
      <br />
      <li
        v-for="(value, name) in sortResult(item.result)"
        :key="name"
        style="font-size: 20px"
      >
        {{ name }}:
        <span style="color: blue">{{ value }}</span>
      </li>
    </div>
    <br />
    <div v-for="item in items" :key="item.type" v-if="item.type == 'numeric'">
      <h3>
        <span style="font-size: 50px">&#128175;</span
        ><b><u>Number Survey</u></b>
      </h3>

      <h3>
        <i>{{ item.label }}</i>
      </h3>
      <br />
      <h3 style="color: blue">{{ item.result }}</h3>
    </div>
    <br />
    <div v-for="item in items" :key="item.type" v-if="item.type == 'date'">
      <h3>
        <span style="font-size: 50px">&#128198;</span><b><u>Date Survey</u></b>
      </h3>

      <h3>
        <i>{{ item.label }}</i>
      </h3>
      <br />
      <h3
        v-for="(date, index) in item.result"
        :key="index"
        style="font-size: 20px"
      >
        {{ index + 1 }}.
        <span>{{ formatDate(date) }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { SURVEY_LIST_URL } from "../assets/Constant";

export default {
  data() {
    return {
      items: [],
      fields: ["code"],
      surveyName: null,
    };
  },
  mounted() {
    this.surveyName = this.$route.params.id;
    this.getSurvey(this.surveyName);
  },
  methods: {
    getSurvey(surveyName) {
      axios
        .get(`${SURVEY_LIST_URL}/${surveyName}`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterSurvey(type) {
      return this.items.filter((item) => item.type === type);
    },
    sortResult(obj) {
      return Object.keys(obj)
        .sort()
        .reduce(function (result, key) {
          result[key] = obj[key];
          return result;
        }, {});
    },
    formatDate(date) {
      return moment(date).format("hh:mm:ss DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
#banner {
  margin: 10px;
}
#button {
  width: 10%;
  height: 25px;
  font-size: 8pt;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
