<template>
  <q-page padding class="column content-center justify-center">
  
    <q-card padding>
      <q-img src="../assets/placeholder.png" />
      <q-form ref="form" @submit="logIn">
        <q-input 
          label="E-mail" 
          v-model="email"
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
          v-model="password"
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
        
        <q-btn 
          color="grey-8" 
          label="Entrar" 
          type="submit"
          :disable="isFormValid()"
        />
        <div>
          Ou
        </div>
        <q-btn 
          color="grey-8" 
          label="Cadastrar"
          flat
          @click="goToRegister"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: null,
      password: null,
      isPwd: true
    };
  },
  methods: {
    ...mapActions(['login']),
    async logIn(){
      this.$axios.post("/users/sign_in", {
        user: {
          email: this.email,
          password: this.password,
        }
      }).then((res) => {
        this.login(res.data)

        this.$q.notify({
          type: "positive",
          message: "Sucesso!",
          position: "top",
        });

        if (res.data.user.admin) {
          this.$router.push("admin/orders");
        } else {
          this.$router.push("user/orders");
        }
      }).catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Erro: " + err.message,
          position: "top",
        });
      })
    },
    isFormValid(){
      return this.$refs.form ? this.$refs.form.validate() : false;
    },
    goToRegister(){
      this.$router.push("register")
    }
  },
  created() {
  },
};
</script>

<style scoped>
.q-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px !important;
  min-width: 300px !important;
}

.q-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inBetweenInput{
  /* top | right | bottom | left */
  /* top and bottom | left and right */
  width: 100%;
  margin: 0.3em 1em;
}

.q-img{
  width: 50%; 
  margin: 3em 0;
}

.q-btn{
  margin: 0 1em 1em 1em;
}
</style>