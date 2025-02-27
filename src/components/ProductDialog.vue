<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div v-if="this.action === 'create'" class="text-h6">Adicionar Produto</div>
          <div v-else class="text-h6">Editar Produto</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="$emit('hide')"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="form" @submit="onSubmit">
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
            label="Valor unitário"
            v-model="newProduct.price"
            :rules="[ val => val != null || 'Campo vazio' ]"
            class="inBetweenInput"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            outlined
            dense
          />

          <div class="flex row">
            <q-btn 
              :color="action === 'create' ? 'green-8' : 'blue-8'" 
              :label="action === 'create' ? 'Cadastrar' : 'Editar'" 
              type="submit"
              :disable="isFormValid"
            />

            <q-btn 
              v-if="action === 'edit'"
              color="red-8"
              style="margin-left: auto;"
              label="Excluir produto"
              @click="deleteProduct"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: {
    product: Object,
    action: { default: 'create'}
  },
  data() {
    return {
      isVisible: false,
      newProduct: {
        name: null,
        price: null,
        description: null
      },
      formattedPrice: ""
    };
  },
  methods: {
    async addNewProduct(){
      await this.$axios.post("/products", {
        product: this.newProduct
      })
      .then(() => {
        this.$q.notify({
          type: "positive",
          message: "Produto adicionado!",
          position: "top",
        });
        
        this.isVisible = false;
        return;
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao criar produto :( - " + err.message,
          position: "top",
        });
      })
    },
    async editProduct(){
      await this.$axios.patch("/products/"+this.newProduct.id, {
        product: this.newProduct
      })
      .then(() => {
        this.$q.notify({
          type: "positive",
          message: "Produto atualizado!",
          position: "top",
        });
        
        this.isVisible = false;
        return;
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao atualizar produto - " + err.message,
          position: "top",
        });
      })
    },
    async deleteProduct(){
      await this.$axios.delete("/products/"+this.newProduct.id)
      .then(() => {
        this.$q.notify({
          type: "positive",
          message: "Produto excluído!",
          position: "top",
        });
        
        this.isVisible = false;
        return;
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro ao deletar produto - " + err.message,
          position: "top",
        });
      })
    },
    onSubmit(){
      if (this.action == 'create') {
        this.addNewProduct();
      }else if (this.action == 'edit'){
        this.editProduct();
      }
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
    if (this.action == "edit") {
      this.newProduct = { ...this.product };
      this.formatPrice(this.newProduct.price.toString());
    }
  }
};
</script>