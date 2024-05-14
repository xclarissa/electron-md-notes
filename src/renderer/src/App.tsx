import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'

function App() {
  return (
    <RootLayout>
      <DraggableTopBar />
      <Sidebar className="p-2">
        <ActionButtonRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-2" />
      </Sidebar>
      <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
    </RootLayout>
  )
}

export default App
