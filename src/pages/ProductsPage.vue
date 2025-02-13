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
          style="margin-right: 3em;"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByName"/>
          </template>
        </q-input>

        <q-btn label="Novo Produto" icon="add" @click="addNewProduct"/>

      </template>
    </q-table>
  </q-page>
</template>

<script>
import ProductDialog from 'src/components/ProductDialog.vue';

export default {
  data() {
    return {
      id: null,
      name: null,
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'quantity', label: 'Quantidade', field: 'quantity', align: 'left', sortable: true },
        { name: 'unitPrice', label: 'Preço Unitário', field: 'unitPrice', align: 'left', sortable: true, format: (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })},
        { name: 'description', label: 'Descrição', field: 'description', align: 'left', sortable: true }
      ],
      unfilteredData: [
        {
          id: 1,
          name: "Pão Francês",
          quantity: 100,
          unitPrice: 0.80,
          description: "Pão crocante por fora e macio por dentro, feito diariamente."
        },
        {
          id: 2,
          name: "Bolo de Chocolate",
          quantity: 10,
          unitPrice: 35.00,
          description: "Bolo caseiro de chocolate com cobertura de brigadeiro."
        },
        {
          id: 3,
          name: "Croissant",
          quantity: 20,
          unitPrice: 5.00,
          description: "Croissant folhado e amanteigado, perfeito para o café da manhã."
        },
        {
          id: 4,
          name: "Sonho",
          quantity: 15,
          unitPrice: 6.50,
          description: "Massa fofinha recheada com creme de baunilha e polvilhada com açúcar."
        },
        {
          id: 5,
          name: "Pão de Queijo",
          quantity: 50,
          unitPrice: 2.50,
          description: "Pão de queijo mineiro feito com queijo artesanal."
        },
        {
          id: 6,
          name: "Torta de Frango",
          quantity: 8,
          unitPrice: 45.00,
          description: "Torta recheada com frango desfiado, milho e requeijão."
        },
        {
          id: 7,
          name: "Rosquinha de Canela",
          quantity: 30,
          unitPrice: 3.00,
          description: "Rosquinha doce coberta com açúcar e canela."
        }
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
      })
    },
    editProduct(row){
      this.$q.dialog({
        component: ProductDialog,
        componentProps: {
          product: row,
          event: 'edit'
        }
      })
    }
  },
  created(){
    this.data = this.unfilteredData;
  }
};
</script>