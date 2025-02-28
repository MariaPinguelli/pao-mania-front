<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Adicionar Produto</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="$emit('hide')"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="form">
          <q-input 
            label="Quantidade" 
            v-model="orderItem.quantity"
            :rules="[ val => val != null || 'Campo vazio' ]"
            type="number"
            class="edgeInput"
            outlined
            dense
          />

          <div class="flex row">
            <q-btn 
              color="green-8" 
              label="Adicionar ao carrinho" 
              icon="add"
              @click="addItem"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      isVisible: false,
      orderItem: {
        product_id: null,
        quantity: 0
      },
      formattedPrice: ""
    };
  },
  computed: {
    ...mapState(['cartItems']),
  },  
  methods: {
    ...mapActions(['addItemToCart']),
    addItem(){
      this.addItemToCart({product: this.product, quantity: this.orderItem.quantity});
      this.isVisible = false;
    },
    formatPrice(value) {
      if (!value) {
        this.formattedPrice = "";
        this.newProduct.price = null;
        return;
      }

      let price = parseFloat(value.toString().replace(",", "."));

      if (isNaN(price)) {
        this.formattedPrice = "";
        this.newProduct.price = null;
        return;
      }

      this.formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(value);

      this.newProduct.price = value;
    }
  },
  created() {
    this.orderItem.product_id = this.product.product_id;
  }
};
</script>