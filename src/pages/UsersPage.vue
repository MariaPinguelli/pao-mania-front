<template>
  <q-page>
    <q-table
      title="Usuários"
      :columns="columns"
      :rows="data"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-input v-model="name" placeholder="Pesquisar nome" dense style="margin-right: 3em;">
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByName"/>
          </template>
        </q-input>
        <q-input v-model="email" placeholder="Pesquisar email" dense>
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByEmail"/>
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>

export default {
  props: { 
    
  },
  data(){
    return {
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
      ],
      data: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phone: "+1 555-1234"
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob.smith@example.com",
          phone: "+1 555-5678"
        },
        {
          id: 3,
          name: "Charlie Brown",
          email: "charlie.brown@example.com",
          phone: "+1 555-8765"
        },
        {
          id: 4,
          name: "David Wilson",
          email: "david.wilson@example.com",
          phone: "+1 555-4321"
        },
        {
          id: 5,
          name: "Emma Davis",
          email: "emma.davis@example.com",
          phone: "+1 555-6789"
        }
      ]
    }
  },
  computed: {
    
  },
  methods: {
    searchByName(){
      
    },
    searchByEmail(){
      console.log("searchByEmail");
    }
  }
}
</script>

<style scoped>
  .q-page{
    padding: 3em;
  }
</style>