<template>
  <q-dialog>
    <q-card>
      {{ user.name }}
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: { 
    user: {}
  },
  data(){
    return {
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>