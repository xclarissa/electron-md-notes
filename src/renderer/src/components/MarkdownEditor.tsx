import MDEditor from '@uiw/react-md-editor'

export const MarkdownEditor = () => {
  return (
    <MDEditor
      height={200}
      className="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500"
    />
  )
}
