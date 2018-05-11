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

const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
]

const client = GQLClient('http://127.0.0.1:3000/graphql', {
  fetch: {
    // anything passed here is merged with
    // the options passed to fetch()
    credentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
});



export default {
  name: 'tableGermplasm',
  data () {
    return {
      msg: 'Small demo requesting from two servers using graphQL backend',
      title : 'DEMO',
      people : { },
      items : items,
      germs : [],
      idToSearch : ""

    }
  },
  methods: {

    async  getAllGermPlasm(){
      const res = await axios.post(
        'http://localhost:3000/graphql', {
        query: `
          query germplasms{germplasmAlias, germplasmName, genus, specie}
          `
      },   {
        headers: { 'Content-Type': 'application/graphql' },
      })
    },


   getGermPlasm () {
    client.query(`
      query people{firstName}`)
      .then((result) => {
          console.log(result.data.people);
        // => { id: 1234, name: ... }
        });

    /*
      this.germs = this.items;
      console.log(this.idToSearch);
      let agent = new https.Agent({ rejectUnauthorized: false });
      const res = await axios.post(
        'http://localhost:3000/graphql', {
        query: `
          people{firstName}
          `
      },   {
        headers: { 'Content-Type': 'application/graphql' },
        httpsAgent: agent,
      })
      this.people = res.data.data.name */
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
