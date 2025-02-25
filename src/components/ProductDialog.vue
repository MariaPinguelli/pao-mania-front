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

          <q-input
            label="Valor unitário"
            v-model.number="newProduct.unitPrice"
            :rules="[ val => val != null || 'Campo vazio' ]"
            type="number"
            class="inBetweenInput"
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            outlined
            dense
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
export default {
  props: {
    product: Object
  },
  data() {
    return {
      isVisible: false,
      newProduct: {
        name: null,
        quantity: null,
        unitPrice: null,
        description: null
      }
    };
  },
  methods: {
    registerProduct(){
      console.log("registerProduct");
    }
    
  },
  created(){

  }
};
</script>