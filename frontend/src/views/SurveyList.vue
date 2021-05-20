<template>
  <div>
    <div class="main">
      <h1>Welcom to the survey</h1>
    </div>
    <span
      >Search:
      <input v-model="searchQuery" placeholder="Searching by name or code"
    /></span>
    <b-table
      striped
      hover
      :items="filteredResources"
      :fields="fields"
      id="table"
    >
      <template v-slot:cell(code)="data">
        <router-link :to="`/${data.value}`">{{ data.value }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { SURVEY_LIST_URL } from "../assets/Constant";

export default {
  data() {
    return {
      items: [],
      fields: ["name", "code"],
      searchQuery: "",
    };
  },
  computed: {
    filteredResources() {
      if (this.searchQuery) {
        return this.items.filter((item) => {
          return (
            item.name.startsWith(this.searchQuery) ||
            item.code.startsWith(this.searchQuery) ||
            item.name.toLowerCase().startsWith(this.searchQuery) ||
            item.code.toLowerCase().startsWith(this.searchQuery)
          );
        });
      } else {
        return this.items;
      }
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(`${SURVEY_LIST_URL}/list`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.main {
  padding: 50px;
}

#table {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}
</style>
