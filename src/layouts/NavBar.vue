<template>
  <q-header elevated class="bg-grey-9 text-white">
    <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Pão Mania
        </q-toolbar-title>

        <q-avatar
          color="primary" 
          text-color="white"
          :clickable="true"
          @click="toggleMenu"
        >
          <q-menu v-model="showProfileOptions">
            <q-list style="min-width: 100px">
              AAAAAAAAAAAAAAAAAA
              <!-- <q-item clickable v-close-popup>
                <q-item-section>New tab</q-item-section>
              </q-item> -->
            </q-list>
          </q-menu>
          J
        </q-avatar>
      </q-toolbar>
  </q-header>
</template>

<script>

export default {
  data(){
    return {
      showProfileOptions: false
      // leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.$emit('toggleLeftDrawer')
    },
    toggleMenu () {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      this.showProfileOptions = !this.showProfileOptions;
    }
  }
}
</script>