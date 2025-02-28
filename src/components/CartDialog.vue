<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Carrinho</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="$emit('hide')"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="cartItems"
          :columns="columns"
          row-key="product.id"
          class="q-mb-md"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn 
                color="negative" 
                icon="delete" 
                size="sm"
                @click="removeItemFromCart(props.row.product.id)"
              />
            </q-td>
          </template>
        </q-table>

        <div class="flex row">
          <q-btn
            label="Esvaziar carrinho"
            color="red-8"
            icon="cancel"
            @click="clearCart"
          />
          <q-btn
            style="margin-left: 4em;"
            label="Finalizar Compra"
            color="green-8"
            icon="expand_circle_down"
            @click="makeOrder"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isVisible: false,
      columns: [
        { name: 'name', label: 'Nome', field: row => row.product.name, align: 'left' },
        { name: 'quantity', label: 'Quantidade', field: 'quantity', align: 'center' },
        { 
          name: 'total', 
          label: 'Total', 
          field: row => row, // Passando a linha inteira para ser utilizada no formato
          align: 'right', 
          format: row => this.formatPrice(row.quantity * row.product.price) // Acessando quantity e price diretamente
        },
        { name: 'action', label: 'Ações', align: 'center' }
      ]

    };
  },
  computed: {
    ...mapState(['cartItems']),
  },
  methods: {
    ...mapActions(['removeItemFromCart', 'clearCart']),
    async makeOrder(){
      let orderItems = this.cartItems.map((item) => {
        return {
          product_id: item.product.id,
          quantity: parseInt(item.quantity)
        }
      })

      // console.log("AAAAAA", this.currentUser().id);

      await this.$axios.post("/orders", {
        order: {
          user_id: this.$currentUser().id,
          status: "Pendente",
          products: orderItems
        }
      }).then(() => {
        this.$q.notify({
          type: "positive",
          message: "Pedido realizado com sucesso!",
          position: "top",
        });
        
        this.clearCart()
        this.isVisible = false;
      }).catch(() => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao criar pedido :(",
          position: "top",
        });
        this.clearCart()
        this.isVisible = false;
      })
    },
    formatPrice(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
  },
  created() {
    // console.log("USER", this.$currentUser().id);
    // console.log('aaaa',this.currentUser());
  }
};
</script>