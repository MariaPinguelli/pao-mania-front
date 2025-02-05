<template>
  <q-drawer 
    show-if-above 
    v-model="drawerOpen" 
    side="left" 
    elevated
  >
    AAAAAAAAAAAAAAAAAAAAAA
  </q-drawer>
</template>

<script>

export default {
  props: { modelValue: { type: Boolean, default: false } },
  // data(){
  //   return {
  //     // leftDrawerOpen: false
  //   }
  // },
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