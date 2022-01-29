export default {
  async login({commit}, data) {
    try {
      let res = await this.$auth.loginWith("laravelSanctum", {
        data: {
          email: data.email,
          password: data.password,
        },
      });
      commit('setUser', res.data)

      return res
    } catch (error) {
      return error.response;
    }
  },

  async logout() {
    try {
      let res = await this.$auth.logout('laravelSanctum')
    } catch (e) {
      return e.response.data;
    }
  }
}
