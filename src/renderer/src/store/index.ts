import { NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { notesMock } from './mocks'

export const notesAtom = atom<NoteInfo[]>(notesMock)

console.log(notesAtom, 'notesAtom')

export const selectedNoteIndexAtom = atom<number | null>(null)
console.log(selectedNoteIndexAtom, 'selectedNoteIndexAtom')

export const selectedNoteAtom = atom((get) => {
  console.log(get, 'get')
  const notes = get(notesAtom)
  console.log(notes, 'notes')
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null) return null

  const selectedNote = notes[selectedNoteIndex]

  return {
    ...selectedNote,
    content: `# Hello from note ${selectedNoteIndex}`
  }
})
