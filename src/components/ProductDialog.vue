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
        <q-form ref="form" @submit="registerProduct">
          <q-input 
            label="Nome" 
            v-model="newProduct.name"
            :rules="[ val => val != null || 'Campo vazio' ]"
            class="edgeInput"
            outlined
            dense
          />

          <q-input 
            label="Descrição" 
            v-model="newProduct.description"
            type="textarea"
            :rules="[ val => val != null || 'Campo vazio' ]"
            class="inBetweenInput"
            outlined
            dense
          />

          <q-input
            label="Quantidade em estoque"
            v-model.number="newProduct.quantity"
            :rules="[ val => val != null || 'Campo vazio' ]"
            type="number"
            class="inBetweenInput"
            outlined
            dense
          />

          <!-- <q-input
            label="Valor unitário"
            v-model="formattedPrice"
            @update:model-value="formatPrice"
            :rules="[ val => val !== '' || 'Campo vazio' ]"
            type="text"
            class="inBetweenInput"
            outlined
            dense
          /> -->

          <MoneyInput
            label="Valor unitário" 
            v-model="newProduct.unitPrice" 
            size="xl"
            autofocus
          />

          <q-btn 
            color="grey-8" 
            label="Cadastrar" 
            type="submit"
            :disable="isFormValid"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import MoneyInput from 'src/components/inputs/MoneyInput.vue';

export default {
  components: {
    MoneyInput
  },  
  props: {
    product: Object,
    action: { default: 'create'}
  },
  data() {
    return {
      isVisible: false,
      newProduct: {
        name: null,
        quantity: null,
        unitPrice: null,
        description: null
      },
      formattedPrice: ""
    };
  },
  methods: {
    registerProduct(){
      console.log("registerProduct");
    },
    editProduct(){
      console.log('editProduct');
    },
    onSubmit(){
      if (this.action == 'create') {
        this.registerProduct();
      }else if (this.action == 'edit'){
        this.editProduct();
      }
    },
    formatPrice(value) {
      if (!value) {
        this.formattedPrice = "";
        this.newProduct.unitPrice = null;
        return;
      }

      let price = parseFloat(value.toString().replace(",", "."));

      if (isNaN(price)) {
        this.formattedPrice = "";
        this.newProduct.unitPrice = null;
        return;
      }

      this.formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(value);

      this.newProduct.unitPrice = value;
    }
  },
  created() {
    if (this.action == "edit") {
      this.newProduct = { ...this.product };
      this.formatPrice(this.newProduct.unitPrice.toString());
    }
  }
};
</script>