import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNote } from '@/store'
import { useSetAtom } from 'jotai'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createNote = useSetAtom(createEmptyNote)

  const handleCreateNote = async () => {
    await createNote()
  }

  return (
    <ActionButton onClick={handleCreateNote} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
