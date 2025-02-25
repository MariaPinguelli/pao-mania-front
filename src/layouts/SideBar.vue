<template>
  <q-drawer 
    show-if-above 
    v-model="drawerOpen" 
    side="left" 
    elevated
  >
    <q-list>
      <q-item 
        v-ripple 
        active-class="bg-brown-10"
         to="/orderList"
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
        to="/menu"
      >
        <q-item-section avatar>
          <q-icon name="bakery_dining" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Produtos da Padaria</div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item 
        v-ripple 
        active-class="bg-brown-10"
        to="/users"
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
        to="/orders"
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
        to="/products"
      >
        <q-item-section avatar>
          <q-icon name="bakery_dining" size="md"/>
        </q-item-section>

        <q-item-section>
          <div>Produtos</div>
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