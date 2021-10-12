<template>
  <v-container>
    <v-app-bar app color="primary" dark dense clipped-left>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{this.currentRoute}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer  app v-model="drawer" dense clipped>
      <!-- <v-list-item class="primary" dark>
        <v-list-item-content>
          <v-list-item-title class="text-h7"> {{ appName }} </v-list-item-title>
          <v-list-item-subtitle> Тюменьгортранс {{currentRoute}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
            <v-treeview 
                shaped 
                hoverable 
                activatable
                :items="items"
                                
            >
                <template slot="label" slot-scope="props">
                    <router-link tag="div" :to="props.item.url" v-if="props.item.url">{{ props.item.name }}</router-link>
                    <span v-else>{{ props.item.name }}</span>
                </template>
            </v-treeview>
    
    </v-navigation-drawer>
    <router-view />
    <v-footer color="primary"  clipped-left app dark dense><h3>This is an footer</h3></v-footer>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    appName: 'Производственные тесты',
    drawer: 0,
    active: [],
    currentRoute: 'Тестирование по дисциплине ',
    items: [
      {
        id: 1,
        name: "Учебные материалы",
        children: [
          { id: 2, name: "Работы на высоте", url: '/wahlearn' },
          { id: 3, name: "Охрана труда", url: '/safetylearn' },
          { id: 4, name: "Рабочий люльки", url: '/twlearn' },
        ],
      },
      {
        id: 5,
        name: "Тесты",
        children: [
          { id: 6, name: "Работы на высоте", url: '/wah' },
          { id: 7, name: "Охрана труда", url: '/safety' },
          { id: 8, name: "Рабочий люльки", url: '/tw' },
        ],
      },
      {
        id: 15,
        name: "Проверка знаний",
        children: [
          { id: 16, name: "Работы на высоте", url: '/wahfull' },
          { id: 17, name: "Охрана труда", url: '/safetyfull' },
          { id: 18, name: "Рабочий люльки", url: '/twfull' },
        ],
      },
      {
        id: 19,
        name: "Администрирование",
        children: [
          { id: 24, name: "Intro : mov" },
          { id: 25, name: "Conference introduction : avi" },
        ],
      },
    ],
  }),
  methods: {
    test() {console.log('TEST', this.active.length)},
  }
};
</script>

<style scoped>
    #app-bar__container {
        width: 100px;
    }

</style>