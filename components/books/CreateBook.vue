<template>
  <v-card>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" autocomplete="off">
        <v-card-title>
          <span class="text-h5">Add Book</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <validation-provider v-slot="{ errors }" name="Title" rules="required">
              <v-text-field
                label="Title *"
                v-model="data.name"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="Author" rules="required">
              <v-text-field
                label="Author *"
                v-model="data.author"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            @click="$emit('closeDialog')"
            :disabled="loading"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['data'],
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions({
      'allBooks': 'books/getAll',
      'storeBook': 'books/store'
    }),
    async onSubmit() {
      this.loading = true;
      try {
        await this.storeBook(this.data);
        this.$emit('success')
      } catch (e) {
        console.log(e.response)
      }
      this.loading = false;
    },
  }
}
</script>
