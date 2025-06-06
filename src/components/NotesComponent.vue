<script setup lang="ts">
import NoteRow from './NoteRow.vue';

import { ref, onMounted } from 'vue'
import { supabase } from "../lib/supabase"
import { Note } from "../lib/note"
import { getId } from '../lib/auth';

let _notes: Note[] = [];
const notes = ref(_notes);

async function fetchNotes() {
	const { data, error } = await supabase.from('notes').select('*')

	if (error)
		console.error(error)
	else {
		notes.value = [];
		data.forEach((n: any) => {
			let note = new Note();

			note.id = n.id;
			note.created_at = new Date(n.created_at);
			note.note = n.note;
			note.value = n.value;

			notes.value.push(note);
		})
	}
}

let newNote = ref("");

async function createNote() {
	let note = new Note();
	note.note = newNote.value;

	const { data, error } = await supabase.from("notes").insert({ note: note.note, owner: await getId() })

	if (error)
		console.error(error)
	else {
		fetchNotes();
	}

	newNote.value = ""
}

onMounted(() => {
	fetchNotes();
})

</script>

<template>
	<div class="card">
		<input type="text" @keyup.enter="createNote" v-model="newNote" />

		<div v-for="note in notes">
			<NoteRow :note="note" :fetch-notes="fetchNotes"></NoteRow>
		</div>

	</div>
</template>

<style scoped></style>
