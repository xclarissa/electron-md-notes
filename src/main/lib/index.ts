import { appDirName, fileEncoding, specificLocal } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNoteContent } from '@shared/types'
import { ensureDir, readFile, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${specificLocal}/${appDirName}`
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

export const readNoteContent: ReadNoteContent = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}
