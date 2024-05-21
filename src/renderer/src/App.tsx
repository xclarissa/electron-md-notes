import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const handleResetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <DraggableTopBar />
      <Sidebar className="p-2">
        <ActionButtonRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-2" onSelect={handleResetScroll} />
      </Sidebar>
      <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
        <FloatingNoteTitle className="pt-2" />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
