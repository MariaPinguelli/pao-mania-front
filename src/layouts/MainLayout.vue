<template>
  <q-layout view="hHh lpR lff">
    <NavBar @toggleLeftDrawer="toggleLeftDrawer" />

    <SideBar v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white row justify-center">
      <div>Pão Mania | 2025</div>
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