<template>
  <v-card>
    <v-container>
      <form @submit.prevent="onSubmit">
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" :loading="isLoading" color="primary">Submit</v-btn>
      </form>
    </v-container>

    <v-snackbar v-model="snackbar" color="error">
      {{ text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    isLoading: false,
    email: null,
    password: null,

    snackbar: false,
    text: "",
  }),
  methods: {
    ...mapActions({
      'login': 'user/login'
    }),
    async onSubmit() {
      this.isLoading = true
      let res = await this.login({email: this.email, password: this.password})

      if (res.status !== 200) {
        let data = res.data;
        this.text = data.message;
        this.snackbar = true;
      }
      console.log(this.$store.state)
      this.$router.push("/");
      this.isLoading = false
    },
  },
};
</script>

<style>
</style>
