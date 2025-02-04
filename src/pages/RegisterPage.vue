<template>
  <q-page padding class="column content-center">
    <h5 class="text-center">Criar conta</h5>
    <q-card padding class="column">
      <q-form ref="form" @submit="registerUser">
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
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        phoneNumber: null,
        email: null,
        password: null,
      },
      confirmPassword: null,
      isPwd: true
    };
  },
  computed: {
    isFormValid(){
      return this.$refs.form.validate()
    }
  },
  methods: {
    registerUser(){
      console.log("Usuário Registrado");
    }
  },
  created() {
    
  },
};
</script>

<style scoped>
.q-card{
  max-width: 400px !important;
  min-width: 300px !important;
}

.inBetweenInput{
  /* top | right | bottom | left */
  /* top and bottom | left and right */
  margin: 0.3em 1em;
}

.edgeInput{
  margin: 1em 1em 0 1em;
}

.q-btn{
  margin: 0 1em 1em 1em;
}
</style>