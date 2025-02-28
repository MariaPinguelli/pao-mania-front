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
          style="margin-left: 3em;"
        >
          <template v-slot:append>
            <q-icon name="search" class="cursor-pointer" @click="searchByName"/>
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import OrderDialog from 'components/OrderDialog.vue';
import { toRaw } from "vue";

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
        // { name: 'user_id', label: 'Usuário ID', field: 'user_id', align: 'left', sortable: true },
        { name: 'user_name', label: 'Cliente', field: 'user_name', align: 'left', sortable: true },
        { name: 'total_price', label: 'Preço Total', field: 'total_price', align: 'right', sortable: true, 
          format: (val) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
        },
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
        { name: 'order_items', label: 'Itens', field: 'order_items', align: 'left',
          format: (val) => val.map(item => `${item.name} (x ${item.quantity})`).join(', ')
        },
        { name: 'created_at', label: 'Data', field: 'created_at', align: 'left', sortable: true,
          format: (val) => new Date(val).toLocaleDateString("pt-BR")
        },
      ],
      unfilteredData: [
      ],
      data: []
    };
  },
  methods: {
    searchByName(){
      this.data = this.unfilteredData.filter(
        order => order.user_name.toLowerCase().includes(this.name.toLowerCase())
      );
    },
    searchById(){
      this.data = this.unfilteredData.filter(
        product => product.id == this.id
      );
    },
    onRowClick(event, row) {
      this.$q.dialog({
        component: OrderDialog,
        componentProps: { order: row }
      }).onOk((action) => {
        this.$axios.patch("/orders/"+row.id, {
          params: {
            id: toRaw(row).id
          },
          order: {
            status: action
          }
        }).then(async () => {
          this.$q.notify({
            type: "positive",
            message: "Status atualizado com sucesso!",
            position: "top",
          });

          this.unfilteredData = await this.getOrders();
        }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao atualizar status. | " + err.message,
          position: "top",
        });
      })
      });
    },
    async getOrders(){
      return await this.$axios.get("/orders")
      .then((res) => {
        this.data = res.data;

        return res.data;
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao buscar pedidos :( - " + err.message,
          position: "top",
        });
      })
    },
  },
  async created() {
    this.unfilteredData = await this.getOrders();
  }
};
</script>

<style scoped>
  .q-page{
    padding: 3em;
  }
</style>