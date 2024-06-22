import { useState } from 'react'
import './App.css'
import { FileExplorer } from './components/file-explorer'
import { Navbar } from './components/navbar'
import { ThemeProvider } from './components/provider/theme-provider'
import explorer from './data/folderData'
import useTraverseTree from './hooks/use-traverse-tree'
import { Toaster } from 'sonner'

function App() {
  const [explorerData, setExplorerData] = useState(explorer)

  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors position="bottom-center" />
      <div className="font-JetMono min-h-screen mx-auto">
        <Navbar />

        <div className="p-5 max-w-2xl h-[70vh] border shadow-md rounded-md bg-gray-200 dark:bg-neutral-700 mx-auto mt-10">

          <h1 className="text-2xl font-bold py-2">
            Explorer
          </h1>

          <FileExplorer handleInsertNode={handleInsertNode} explorer={explorerData} />
        </div>

      </div>
    </ThemeProvider>
  )
}

export default App
