<template>
  <q-page>
    <q-table
      title="Produtos"
      :columns="columns"
      :rows="data"
      row-key="id"
    >
      <template v-slot:top-right>
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

        <q-btn flat label="Carrinho" icon="shopping_cart" @click="showCart"/>

      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn 
            color="primary" 
            icon="add"
            size="sm"
            @click="addToCart(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ItemDialog from 'src/components/ItemDialog.vue';
import CartDialog from 'src/components/CartDialog.vue';
import { toRaw } from "vue";

export default {
  data() {
    return {
      id: null,
      name: null,
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'price', label: 'Preço Unitário', field: 'price', align: 'left', sortable: true, format: (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })},
        { name: 'description', label: 'Descrição', field: 'description', align: 'left', sortable: true },
        { name: 'action', label: 'Ações', align: 'center' },
      ],
      unfilteredData: [],
      data: []
    };
  },
  computed: {
    ...mapState(['cartItems']),
  },
  methods: {
    ...mapActions(['addItemToCart']),
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
    },
    addToCart(row){
      this.$q.dialog({
        component: ItemDialog,
        componentProps: {
          product: toRaw(row)
        }
      })
    },
    showCart(){
      this.$q.dialog({
        component: CartDialog
      }).onDismiss(() => {

      });
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