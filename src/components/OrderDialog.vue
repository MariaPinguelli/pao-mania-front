<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Gerenciar pedido</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="onDialogCancel"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
        <div style="margin-bottom: 2em" class="q-mt-md">Deseja cancelar ou confirmar o pedido?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar pedido" color="red-8" @click="confirm('cancelado')" />

        <q-btn 
          :label="'Confirmar retirada'"
          :color="'blue-8'"
          @click="confirm('retirado')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    order: Object
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    confirm(action) {
      this.$emit("ok", action);
      this.isVisible = false;
    },
    onDialogCancel() {
      this.isVisible = false;
    }
  }
};
</script>
