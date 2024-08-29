import { appDirName, fileEncoding, welcomeNoteFileName } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNoteContent, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNote from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  // return `${homedir()}\\${appDirName}`
  return path.join(homedir(), appDirName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const mdNoteFile = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(mdNoteFile)) {
    const content = await readFile(welcomeNote, { encoding: fileEncoding })
    await writeFile(`${rootDir}/${welcomeNoteFileName}`, content, { encoding: fileEncoding })

    mdNoteFile.push(welcomeNoteFileName)
  }
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

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Nova nota',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Criar',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Falha na Criação',
      message: `Todas as notas devem ser salvas em ${rootDir}. Evite usar outros diretórios!`
    })
    return false
  }

  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: `warning`,
    title: 'Deletar nota',
    message: `Certeza que deseja deletar ${filename}? `,
    buttons: ['Deletar', 'Cancelar'], // deletar 0, cancelar 1
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    return false
  }

  await remove(`${rootDir}/${filename}.md`)
  return true
}
