<template>
  <q-page padding class="column content-center justify-center">
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
            val => val === user.password || 'As senhas não coincidem'
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
        />
        <q-btn 
          color="grey-8" 
          label="Voltar"
          flat
          @click="goBack"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
// import axios from 'axios';

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
      isPwd: true,
      formValid: false, // Inicia o formulário inválido
    };
  },
  methods: {
    validateForm() {
      // Quando o formulário for enviado, realiza a validação
      this.$refs.form.validate().then(isValid => {
        this.formValid = isValid; // Habilita ou desabilita o botão baseado na validação
      });
    },
    resetForm() {
      this.user = { name: "", phoneNumber: "", email: "", password: "" };
      this.confirmPassword = "";
      this.formValid = false;
      this.$refs.form.resetValidation();
    },
    async registerUser() {
      // Chama a validação antes de enviar o formulário
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        return; // Se o formulário não for válido, não prossegue
      }

      let userData = { ...this.user };
      delete userData.registration; 

      // axios.post(process.env.API_URL+"/users", {
      //     name: this.user.name,
      //     // phone_number: this.user.phoneNumber,
      //     email: this.user.email,
      //     password: this.user.password,
      //   })
      //   .then(response => {
          this.$q.notify({
            type: "positive",
            message: "Cadastro realizado com sucesso!",
            position: "top",
          });

        //   console.log("Usuário registrado com sucesso!", response.data);

        //   this.resetForm();
        this.$router.push("login");
        // })
        // .catch(error => {
        //   this.$q.notify({
        //     type: "negative",
        //     message: error.response?.data?.message || "Erro ao cadastrar. Verifique os dados.",
        //     position: "top",
        //   });
        // });
    },
    goBack(){
      this.$router.push("login")
    }
  },
  created() {
    // Removido código de console.log
  },
};
</script>

<style scoped>
.q-card{
  max-width: 400px !important;
  min-width: 300px !important;
}

.inBetweenInput{
  margin: 0.3em 1em;
}

.edgeInput{
  margin: 1em 1em 0 1em;
}

.q-btn{
  margin: 0 1em 1em 1em;
}
</style>
