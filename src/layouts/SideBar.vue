<template>
  <q-drawer 
    show-if-above 
    v-model="drawerOpen" 
    side="left" 
    elevated
  >
    <q-list v-if="$currentUser().admin">
      <q-item 
        v-ripple 
        active-class="bg-brown-10"
        to="/admin/users"
      >
        <q-item-section avatar>
          <q-icon name="group" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Usuários</div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item 
        v-ripple
        active-class="bg-brown-10"
        to="/admin/orders"
      >
        <q-item-section avatar>
          <q-icon name="local_mall" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Pedidos</div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item 
        v-ripple
        active-class="bg-brown-10"
        to="/admin/products"
      >
        <q-item-section avatar>
          <q-icon name="bakery_dining" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Produtos</div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list v-else>
      <q-item 
        v-ripple 
        active-class="bg-brown-10"
        to="/user/orders"
      >
        <q-item-section avatar>
          <q-icon name="local_mall" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Meus Pedidos</div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item 
        v-ripple
        active-class="bg-brown-10"
        to="/user/menu"
      >
        <q-item-section avatar>
          <q-icon name="bakery_dining" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Padaria</div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>

export default {
  props: { 
    modelValue: { type: Boolean, default: false } 
  },
  computed: {
    drawerOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.$emit('toggleLeftDrawer')
    }
  }
}
</script>

<style scoped>
  .q-list{
    margin-top: 3em;
    font-size: 20px;
  }
  .q-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #5d4037;
    color: white;
  }
</style>