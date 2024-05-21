import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNoteContent = (title: NoteInfo['title']) => Promise<NoteContent>
