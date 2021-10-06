<template>
  <v-app id="App">
      <component :is="layout">
        <router-view/>
      </component>
  </v-app>
</template>

<script>

import MainLayout from '../src/layouts/MainLayout.vue'
import FormLayout from '../src/layouts/FormLayout.vue'

export default {
  name: 'App',

  data: () => ({
    
  }),

  computed: {
    layout () {
      console.log(this.$route.meta.layout);
      return this.$route.meta.layout;
    },
  },

  components: {
    FormLayout, 
    MainLayout,
  },
};
</script>
