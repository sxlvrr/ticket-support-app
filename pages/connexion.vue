<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="handleSubmit">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
        
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
  
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    // Logique de connexion (vérifier les identifiants, redirection, etc.)
    console.log('Connexion avec:', email.value, password.value);
  };
  </script>
  
  <style scoped>
  /* Style spécifique à la page de connexion */
  </style>
  