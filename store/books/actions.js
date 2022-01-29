export default {
  async getAll() {
    try {
      let res = await this.$axios.get('api/books')
      return res.data
    } catch (e) {
      return e.response
    }
  },

  async store(context, data) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      let res = await this.$axios.post('api/books', formData)
      return res.data;
    } catch (e) {
      console.log(e.response)
    }
  },

  async update(context, data) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    formData.append('_method', 'PUT');

    try {
      let res = await this.$axios.post('api/books/' + data.id, formData)
      return res.data;
    } catch (e) {
      console.log(e.response)
    }
  },

  async delete(context, id) {
    const formData = new FormData();

    formData.append('_method', 'DELETE');

    try {
      let res = await this.$axios.post('api/books/' + id, formData)
      return res.data;
    } catch (e) {
      console.log(e.response)
    }
  }
}
