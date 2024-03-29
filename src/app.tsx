/**
 * NLW Expert - Trilha ReactJS
 **/

import logo from './assets/logo.svg'

import { useState } from "react"
import { NewNote } from './components/notes/new-note-card'
import { Note } from './components/notes/note-card'
import type { Note as TNote } from './components/notes/note-card'
import { Search } from './components/search'

const store_versioning = `notes@${import.meta.env.VITE_APP_VERSION}`

export function App() {
	const [notes, setNotes] = useState<TNote[]>(()=>{
		const storedNotes = localStorage.getItem(store_versioning)
		if (!!storedNotes) return JSON.parse(storedNotes)
		return []
	})

	const handleCreateNote = (note: string) => {
		const now = new Date()
		const newNote:TNote = {
			id: `note-${now.getMilliseconds()}`,
			content: note,
			created_at: now
		}

		const updated = [newNote, ...notes]
		setNotes(updated)

		localStorage.setItem(store_versioning, JSON.stringify(updated))
	}

	const handleDeleteNote = (id: string) => {
		const updated = notes.filter(note => note.id!==id)
		setNotes(updated)

		localStorage.setItem(store_versioning, JSON.stringify(updated))
	}

	const handleSearch = (query:string) => {
		const stored = localStorage.getItem(store_versioning)
		if (!stored) return;

		const parsed:Note[] = JSON.parse(stored)
		const filter = parsed.filter(note => note.content.includes(query))

		setNotes(filter)
	}

	return (
		<div className="w-screen max-w-[1092px] min-h-screen flex flex-col gap-10 items-start p-5">
		  <img src={logo} className="h-6 w-auto smax:mx-auto" alt="nlw-expert-notexpert" />

			<Search onSearch={handleSearch} />

			<hr className="w-full h-0.25 bg-slate-700"/>

			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 gap-3 auto-rows-[250px]">	
			  <NewNote onCreateNote={handleCreateNote} />

				{ notes.map(note => (
					<Note
					  key={note.id}
						note={note}
						onDeleteNote={handleDeleteNote}
					/>
				)) }
			</div>
		</div>
	)
}

