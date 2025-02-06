<template>
  <q-header elevated class="bg-grey-9 text-white">
    <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Pão Mania
        </q-toolbar-title>

        <q-avatar
          color="black" 
          text-color="white"
          class="cursor-pointer"
        >
          <q-icon name="person"/>
          <q-menu v-model="showProfileOptions">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                Carrinho
              </q-item>
              <q-item clickable v-close-popup @click="$router.push('profile')">
                Meu Perfil
              </q-item>
              <q-item clickable v-close-popup>
                <q-icon name="output"/> 
                <div style="margin-left: 0.5em">Sair</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
  </q-header>
</template>

<script>

export default {
  data(){
    return {
      showProfileOptions: false
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.$emit('toggleLeftDrawer')
    },
  }
}
</script>

<style scoped>
.q-menu{
  min-width: 100px;
}
.q-item{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>