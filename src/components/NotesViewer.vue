<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from "../lib/supabase"

const count = ref(0)

class Note {
	id: number
	created_at: Date
	note: string
	value: number

	constructor(id: number, created_at: string, note: string, value: number) {
		this.id = id;
		this.created_at = new Date(created_at);
		this.note = note;
		this.value = value;
	}
}

let _notes: Note[] = [];
const notes = ref(_notes);

async function fetchNotes() {
	const { data, error } = await supabase.from('notes').select('*')
	if (error)
		console.error(error)
	else {
		data.forEach((n: any) => {
			let note = new Note(n.id, n.created_at, n.note, n.value);
			notes.value.push(note);
		})
	}
}

</script>

<template>
	<div class="card">
		<button type="button" @click="fetchNotes">fetch notes</button>

		<div v-for="note in notes">
			<div>{{ note.id }} {{ note.created_at.toLocaleString("en-US")}} {{ note.note }} {{ note.value }}</div>
		</div>

	</div>
</template>

<style scoped></style>
