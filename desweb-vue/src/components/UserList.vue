<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Fecha Nacimiento</th>
          <th>Género</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.dni }}</td>
          <td>{{ u.nombres }}</td>
          <td>{{ u.apellidos }}</td>
          <td>{{ new Date(u.fechaNacimiento).toLocaleDateString() }}</td>
          <td>{{ u.genero }}</td>
          <td>{{ u.ciudad }}</td>
          <td>
            <button class="edit-btn" @click="$emit('edit', u)">
              ✏️
            </button>
            <button class="delete-btn" @click="$emit('delete', u._id)">
              🗑️
            </button>
          </td>
        </tr>

        <tr v-if="users.length === 0">
          <td colspan="7" class="no-data-row">📭 No hay registros disponibles</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {
    users: Array,
  },
};
</script>