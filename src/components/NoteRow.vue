<script setup lang="ts">
import { Note } from '../lib/note'
import { supabase } from "../lib/supabase"
import { defineProps } from 'vue'

const props = defineProps<{
	note: Note
	fetchNotes: () => void
}>()

async function deleteNote(id: number) {
	const { error } = await supabase.from('notes').delete().eq("id", id);

	if (error)
		console.error(error)
	else {
		props.fetchNotes();
	}
}

async function updateNote(note: Note) {
	const { error } = await supabase.from('notes').update({ value: note.value + 1 }).eq("id", note.id);

	if (error)
		console.error(error)
	else {
		props.fetchNotes();
	}
}

</script>

<template>

	<div>
		<span style="padding: 2pt;">{{ note.note }} ({{ note.value }})</span>
		<span style="padding: 2pt; color: lightcoral" @click="deleteNote(note.id)">delete</span>
		<span style="padding: 2pt; color: lightgreen" @click="updateNote(note)">update</span>
	</div>

</template>

<style scoped></style>