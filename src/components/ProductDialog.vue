<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">Editar Produto</div>
          <div class="cursor-pointer" style="margin-left: 12em; width: fit-content;" @click="onDialogCancel"> 
            <q-icon name="close"/>
            Fechar
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="form" @submit="edit">
          <q-input 
            label="Nome" 
            v-model="user.name"
            :rules="[ val => val != null || 'Campo vazio' ]"
            class="edgeInput"
            outlined
            dense
          />
          <q-input 
            label="Número"
            v-model="user.phoneNumber"
            mask="(##) # #### - ####"
            :rules="[ val => val.length > 0 || 'Campo vazio' ]"
            class="inBetweenInput"
            outlined
            dense
          />
          <q-input 
            label="E-mail" 
            v-model="user.email"
            type="email"
            :rules="[
              val => val != null || 'Campo vazio',
              (val, rules) => rules.email(val)|| 'Digite um email válido!'
            ]"
            class="inBetweenInput"
            outlined
            dense
          />
          <q-input 
            label="Senha" 
            v-model="user.password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[ val => val != null || 'Campo vazio' ]"
            class="inBetweenInput"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input 
            label="Confirme a senha" 
            v-model="confirmPassword"
            :type="isPwd ? 'password' : 'text'"
            :rules="[ 
              val => val != null,
              val => val === user.password
            ]"
            class="inBetweenInput"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn 
            color="grey-8" 
            label="Cadastrar" 
            type="submit"
            :disable="isFormValid"
          />
        </q-form>
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
    product: Object
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    
  }
};
</script>