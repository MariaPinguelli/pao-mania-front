<template>
  <q-page>
    <q-table
      title="Pedidos"
      :columns="columns"
      :rows="data"
      row-key="id"
      @row-click="onRowClick"
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

        <q-btn label="Criar Pedido" color="positive" @click="createOrder" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import OrderDialog from 'components/OrderDialog.vue';

export default {
  props: {
    user: Object
  },
  data() {
    return {
      id: null,
      name: null,
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'name', label: 'Cliente', field: 'name', align: 'left', sortable: true },
        { 
          name: 'items', 
          label: 'Itens', 
          field: 'items', 
          align: 'left', 
          sortable: true, 
          format: val => val.map(item => `${item.product} x${item.quantity}`).join(", ")
        },
        { 
          name: 'total', 
          label: 'Total', 
          field: 'total', 
          align: 'left', 
          sortable: true, 
          format: val => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
        },
      ],
      unfilteredData: [
        {
          id: 1,
          name: "João Silva",
          items: [
            { product: "Pão Francês", quantity: 5, price: 1.50 },
            { product: "Bolo de Chocolate", quantity: 1, price: 20.00 }
          ],
          total: 27.50
        },
        {
          id: 2,
          name: "Maria Fernanda",
          items: [
            { product: "Croissant", quantity: 2, price: 5.00 },
            { product: "Brioche", quantity: 3, price: 4.50 }
          ],
          total: 23.50
        },
        {
          id: 3,
          name: "Carlos Oliveira",
          items: [
            { product: "Rosquinha", quantity: 10, price: 2.00 },
            { product: "Pão de Queijo", quantity: 6, price: 3.50 }
          ],
          total: 47.00
        },
        {
          id: 4,
          name: "Ana Souza",
          items: [
            { product: "Baguete", quantity: 2, price: 6.00 },
            { product: "Sonho", quantity: 4, price: 3.75 }
          ],
          total: 27.00
        },
        {
          id: 5,
          name: "Lucas Mendes",
          items: [
            { product: "Torta de Morango", quantity: 1, price: 35.00 },
            { product: "Pão Integral", quantity: 2, price: 7.50 }
          ],
          total: 50.00
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
    createOrder(){
      console.log("Criando um novo pedido...");
    },
    onRowClick(row) {
      this.$q.dialog({
        component: OrderDialog,
        componentProps: { order: row }
      }).onOk((action) => {
        if (action === "delete") {
          this.deleteOrder(row);
        } else if (action === "confirmPickup") {
          this.confirmPickup(row);
        }
      });
    },
    deleteOrder(order) {
      console.log(`Pedido ${order.id} excluído.`);
    },
    confirmPickup(order) {
      console.log(`Pedido ${order.id} retirado.`);
    }
  },
  created() {
    this.data = this.unfilteredData;
  }
};
</script>
