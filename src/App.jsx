import { useState } from 'react'
import Hud from './components/hud'
import Sidebar from './components/sidebar'

function App() {
  const [selecionado, setSelecionado] = useState("Folders");
  
  return (
    <>
      <Sidebar
        selecionado={selecionado}
        setSelecionado={setSelecionado}
      />
      <Hud selecionado={selecionado} />
    </>
  )
}

export default App
