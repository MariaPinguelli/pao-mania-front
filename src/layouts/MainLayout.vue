<template>
  <q-layout view="hHh lpR lff">
    <NavBar @toggleLeftDrawer="toggleLeftDrawer" />

    <SideBar v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white row justify-between">
      <div><strong>Pão Mania</strong> | 2025</div>
      <div><strong>Contato:</strong> contato@pao.mania</div>
    </q-footer>

  </q-layout>
</template>

<script>
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar
  },
  data(){
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>

<style scoped>
.q-footer{
  padding: 1em;
}
</style>