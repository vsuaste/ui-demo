<template>
<div>
  <h1>{{ title }}</h1>
  <p>{{ msg }}</p>
  <div>
  <input v-model="idToSearch" placeholder="Germ plasmId ">
  <button @click="getGermPlasm">Get Germplasm by Id</button>
  </div>

  <div>
  <button @click="getAllGermPlasm">Get all Germplasm </button>
  </div>

  <div>
  <button @click="testGraphQl">Test </button>
  </div>

  <b-table striped hover :items="germs"></b-table>

</div>


</template>

<script>
import axios from 'axios'
import https from 'https'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { GQLClient } from 'graphql-http'

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'tableGermplasm',
  data () {
    return {
      msg: 'Small demo requesting from two servers using graphQL backend',
      title : 'DEMO',
      people : [],
      items : items,
      germs : [],
      idToSearch : ""

    }
  },
  methods: {

      async  getAllGermPlasm(){
        const res = await axios.post('http://localhost:3000/graphql',
          {
            query: `{germplasms{germplasmAlias, germplasmName, genus, specie}}`
          }).then((result) => {
            console.log(result.data.data.germplasms);
            this.germs = result.data.data.germplasms;
          });
      },

      /*
      async testGraphQl(){
        console.log("Getting people...");

        const res = await axios.post('http://localhost:3000/graphql',
            {
              query: `{people{firstName}}`
            }).then( (result)=>{
              console.log(result.data.data.people);
            });
      },
      */
      
     async getGermPlasm() {
        console.log(this.idToSearch);
        console.log(`{ readOneGermplasm(nameToSearch:${this.idToSearch}){ germplasmAlias, germplasmName, genus, specie } }`);
        const res = await axios.post(
          'http://localhost:3000/graphql',
          {
            query: `{ readOneGermplasm(nameToSearch:"${this.idToSearch}"){ germplasmAlias, germplasmName, genus, specie } }`
          }).then((result) => {
            console.log(result.data.data.readOneGermplasm);
            this.germs = [result.data.data.readOneGermplasm] ;
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
