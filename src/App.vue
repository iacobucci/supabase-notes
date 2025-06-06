<script setup lang="ts">
import LoginComponent from './components/LoginComponent.vue';
import NotesComponent from './components/NotesComponent.vue';

import { ref, onMounted } from "vue"
import { isLoggedIn } from "./lib/auth";

const loggedIn = ref(false);

onMounted(async () => {
	loggedIn.value = await isLoggedIn();
})

</script>

<template>
	<!-- c'è un two-way binding tra il componente che permette il login e la variabile reattiva accountId -->
	<LoginComponent v-model="loggedIn" />

	<!-- se l'utente ha eseguito l'accesso viene mostrato il componente delle note -->
	<div v-if="loggedIn">
		<NotesComponent />
	</div>
</template>

<style scoped></style>
