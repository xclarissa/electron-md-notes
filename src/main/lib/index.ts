import { appDirName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes } from '@shared/types'
import { ensureDir, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  // const specificPath = 'C:/workspace/electron/markdown-notes-electron'
  return `${homedir()}/${appDirName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const mdNoteFile = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(mdNoteFile.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStatus = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStatus.mtimeMs
  }
}
