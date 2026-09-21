import { useState } from 'react'
import Hud from './components/hud'
import Sidebar from './components/sidebar'
import ConfigsModal from './Modals/ConfigsModal';
function App() {
  const [selecionado, setSelecionado] = useState("Folders");
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Sidebar
        selecionado={selecionado}
        setSelecionado={setSelecionado}
        abrirConfigs={() => setModalAberto(true)}
      />

      <Hud selecionado={selecionado} />
      {modalAberto && (
        <ConfigsModal
          fechar={() => setModalAberto(false)}
        />
      )}
    </>
  )
}

export default App
