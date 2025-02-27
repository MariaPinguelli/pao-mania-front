<template>
  <q-page>
    <q-table
      title="Produtos"
      :columns="columns"
      :rows="data"
      row-key="id"
      @row-click="editProduct"
    >
      <template v-slot:top-right>
        <q-input 
          v-model="id" 
          placeholder="Pesquisar ID" 
          dense 
          @update:model-value="searchById"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchById"/>
          </template>
        </q-input>

        <q-input 
          v-model="name" 
          placeholder="Pesquisar nome" 
          @update:model-value="searchByName"
          dense 
          style="margin-right: 3em; margin-left: 3em;"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByName"/>
          </template>
        </q-input>

        <q-btn flat label="Novo Produto" icon="add" @click="addNewProduct"/>

      </template>
    </q-table>
  </q-page>
</template>

<script>
import ProductDialog from 'src/components/ProductDialog.vue';
import { toRaw } from "vue";

export default {
  data() {
    return {
      id: null,
      name: null,
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'price', label: 'Preço Unitário', field: 'price', align: 'left', sortable: true, format: (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })},
        { name: 'description', label: 'Descrição', field: 'description', align: 'left', sortable: true }
      ],
      unfilteredData: [
      ],
      data: []
    };
  },
  methods: {
    searchByName(){
      this.data = this.unfilteredData.filter(
        product => product.name.toLowerCase().includes(this.name.toLowerCase())
      );
    },
    searchById(){
      this.data = this.unfilteredData.filter(
        product => product.id == this.id
      );
    },
    addNewProduct(){
      this.$q.dialog({
        component: ProductDialog,
      }).onDismiss(async () => {
        this.unfilteredData = await this.getProducts();
      })
    },
    editProduct(event, row){
      this.$q.dialog({
        component: ProductDialog,
        componentProps: {
          product: toRaw(row),
          action: 'edit'
        }
      }).onDismiss(async () => {
        this.unfilteredData = await this.getProducts();
      })
    },
    async getProducts(){
      await this.$axios.get("/products")
      .then((res) => {
        this.data = res.data;

        return res.data;
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao buscar produtos :( - " + err.message,
          position: "top",
        });
      })
    }
  },
  async created(){
    this.unfilteredData = await this.getProducts();
  }
};
</script>

<style scoped>
  .q-page{
    padding: 3em;
  }
</style>