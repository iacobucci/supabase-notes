<script setup lang="ts">
import { signInWithGoogle, getName, getId, signOut } from '../lib/auth';
import { ref, defineModel, onMounted } from 'vue'

const loggedIn = defineModel<boolean>();

const buttonText = ref("Accedi con Google");

onMounted(async () => {
	let username = await getName();
	buttonText.value = username;
})

async function signInOrOut() {
	try {
		// login
		if (!loggedIn.value) {
			await signInWithGoogle();
			// loggedIn.value = true; // evita il "bounce"
		}
		else {
			await signOut();
			buttonText.value = "Accedi con Google"
			loggedIn.value = false;
		}
	}
	catch (e) {
		console.error(e);
	}
}

</script>

<template>
	<button @click="signInOrOut">{{ buttonText }}</button>
</template>

<style scoped></style>