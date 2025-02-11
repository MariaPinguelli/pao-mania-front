<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Gerenciar Usuário</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="onDialogCancel"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
        <div style="margin-bottom: 2em" class="q-mt-md">O que deseja fazer com {{ user.name }}?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Excluir" color="red-8" @click="confirm('delete')" />

        <q-btn 
          :label="user.isAdmin ? 'Remover Admin' : 'Promover a Admin'"
          :color="user.isAdmin ? 'amber-8' : 'blue-8'"
          @click="confirm('toggleAdmin')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    confirm(action) {
      this.$emit("ok", action); // Envia a ação para o pai
      this.isVisible = false; // Fecha o diálogo
    },
    onDialogCancel() {
      this.isVisible = false; // Fecha o diálogo ao cancelar
    }
  },
  watch: {
    // Controla a visibilidade do diálogo com base no v-model
    isVisible(val) {
      if (!val) {
        this.$emit("hide");
      }
    }
  }
};
</script>
