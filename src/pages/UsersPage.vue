<template>
  <q-page>
    <q-table
      title="Usuários"
      :columns="columns"
      :rows="data"
      row-key="id"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-input 
          v-model="name" 
          placeholder="Pesquisar nome" 
          @update:model-value="searchByName" 
          dense 
          style="margin-right: 3em;"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByName"/>
          </template>
        </q-input>

        <q-input 
          v-model="email" 
          placeholder="Pesquisar email" 
          dense 
          @update:model-value="searchByEmail"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByEmail"/>
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import UserDialog from 'src/components/UserDialog.vue';

export default {
  // components: {
  //   UserDialog
  // },
  props: { 
    
  },
  data(){
    return {
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
      ],
      unfilteredData: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phone: "+1 555-1234",
          isAdmin: true
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob.smith@example.com",
          phone: "+1 555-5678",
          isAdmin: false
        },
        {
          id: 3,
          name: "Charlie Brown",
          email: "charlie.brown@example.com",
          phone: "+1 555-8765",
          isAdmin: true
        },
        {
          id: 4,
          name: "David Wilson",
          email: "david.wilson@example.com",
          phone: "+1 555-4321",
          isAdmin: false
        },
        {
          id: 5,
          name: "Emma Davis",
          email: "emma.davis@example.com",
          phone: "+1 555-6789",
          isAdmin: true
        }
      ],
      data: [],
      email: null,
      name: null
    }
  },
  computed: {
    
  },
  methods: {
    searchByName(){
      this.data = this.unfilteredData.filter(
        user => user.name.toLowerCase().includes(this.name.toLowerCase())
      );
    },
    searchByEmail(){
      this.data = this.unfilteredData.filter(
        user => user.email.toLowerCase().includes(this.email.toLowerCase())
      );
    },
    onRowClick(event, row){
      console.log("onRowClick", event, row);
      this.$q.dialog({
        component: UserDialog,
        componentProps: { user: row }
      }).onOk((action) => {
        if (action === "delete") {
          this.deleteUser(row);
        } else if (action === "toggleAdmin") {
          this.toggleAdmin(row);
        }
      });
    },
    deleteUser(user){
      console.log("yey", user);
    },
    toggleAdmin(user){
      console.log("yey", user);
    }
  },
  created(){
    //quando tiver back, é só chamar e guardar no unfilteredData <3
    this.data = this.unfilteredData;
  }
}
</script>

<style scoped>
  .q-page{
    padding: 3em;
  }
</style>