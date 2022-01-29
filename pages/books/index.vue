<template>
  <v-container>
    <v-card>
      <v-card-title>
        Books
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = true"
          color="primary"
          fab small
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <v-data-table
          :headers="column"
          :items="books"
          :items-per-page="5"
          :loading="isLoading"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-icon="mdi-magnify"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="edit(item)"
              color="success"
              small icon
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              @click="onDelete(item)"
              color="error"
              small icon
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <CreateBook :data="data" @closeDialog="closeCreate" @success="created"></CreateBook>
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      persistent
      max-width="600px"
    >
      <EditBook :data="data" @closeDialog="closeEdit" @success="updated"></EditBook>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import CreateBook from "~/components/books/CreateBook";
import EditBook from "~/components/books/EditBook";

export default {
  name: 'Books',
  components: {EditBook, CreateBook},
  data: () => ({
    isLoading: false,
    loading: false,
    dialog: false,
    editDialog: false,
    search: null,
    data: {
      name: null,
      author: null,
    },
    books: [],
    column: [
      {text: 'Title', value: 'name'},
      {text: 'Author', value: 'author'},
      {text: 'Actions', value: 'actions'},
    ]
  }),
  mounted() {
    this.getAll();
  },
  methods: {
    ...mapActions({
      'allBooks': 'books/getAll',
      'storeBook': 'books/store',
      'deleteBook': 'books/delete'
    }),
    async getAll() {
      this.isLoading = true;
      this.books = await this.allBooks();
      this.isLoading = false;
    },
    created() {
      this.resetForm();
      this.getAll();
      this.dialog = false;
    },
    updated() {
      this.resetForm();
      this.getAll();
      this.editDialog = false;
    },
    closeCreate() {
      this.resetForm();
      this.dialog = false;
    },
    closeEdit() {
      this.resetForm();
      this.editDialog = false;
    },
    resetForm() {
      this.data = {
        name: null,
        author: null,
      }
    },
    edit(item) {
      this.editDialog = true;
      this.data = {
        id: item.id,
        name: item.name,
        author: item.author
      }
    },
    async onDelete(item) {
      this.isLoading = true
      let res = await this.deleteBook(item.id)
      this.getAll();
    }
  }
}
</script>
