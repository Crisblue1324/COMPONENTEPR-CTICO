<template>
  <form @submit.prevent="handleSubmit" class="form">
    <input
      type="text"
      v-model="form.dni"
      placeholder="DNI"
      required
    />
    <input
      type="text"
      v-model="form.nombres"
      placeholder="Nombres"
      required
    />
    <input
      type="text"
      v-model="form.apellidos"
      placeholder="Apellidos"
      required
    />
    <input
      type="date"
      v-model="form.fechaNacimiento"
      required
    />

    <div class="radio-group">
      <label>
        <input
          type="radio"
          value="Masculino"
          v-model="form.genero"
        />
        Masculino
      </label>
      <label>
        <input
          type="radio"
          value="Femenino"
          v-model="form.genero"
        />
        Femenino
      </label>
    </div>

    <select v-model="form.ciudad" required>
      <option value="">Seleccione ciudad</option>
      <option value="Quito">Quito</option>
      <option value="Guayaquil">Guayaquil</option>
      <option value="Cuenca">Cuenca</option>
    </select>

    <button type="submit">{{ editingUser ? "Actualizar" : "Guardar" }}</button>
  </form>
</template>

<script>
import "../assets/form.css";

export default {
  name: "UserForm",
  props: {
    onSubmit: Function,
    editingUser: Object,
  },
  data() {
    return {
      form: {
        dni: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "Masculino",
        ciudad: "",
      },
    };
  },
  watch: {
    editingUser(newVal) {
      if (newVal) {
        this.form = { ...newVal };
      }
    },
  },
  methods: {
    handleSubmit() {
      this.onSubmit(this.form);
      this.form = {
        dni: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "Masculino",
        ciudad: "",
      };
    },
  },
};
</script>
