import { GetNotes, ReadNoteContent } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNoteContent: ReadNoteContent
    }
  }
}
