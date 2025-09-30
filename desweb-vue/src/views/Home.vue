<template>
  <div style="position: relative; padding: 20px;">
    <h1>CRUD - Vue</h1>

    <button @click="showForm = true" class="add-btn">
      Agregar Usuario
    </button>

    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content">
        <UserForm
          :onSubmit="handleSubmit"
          :editingUser="editingUser"
        />
        <button class="close-btn" @click="closeForm">X</button>
      </div>
    </div>

    <UserList
      :users="users"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script>
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

export default {
  name: "Home",
  components: { UserForm, UserList },
  data() {
    return {
      users: [],
      editingUser: null,
      showForm: false,
    };
  },
  async mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      const res = await getUsers();
      this.users = res.data;
    },
    async handleSubmit(data) {
      if (this.editingUser) {
        await updateUser(this.editingUser._id, data);
        this.editingUser = null;
      } else {
        await createUser(data);
      }
      this.showForm = false;
      this.loadUsers();
    },
    handleEdit(user) {
      this.editingUser = user;
      this.showForm = true;
    },
    async handleDelete(id) {
      await deleteUser(id);
      this.loadUsers();
    },
    closeForm() {
      this.showForm = false;
      this.editingUser = null;
    },
  },
};
</script>
