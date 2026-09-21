import "../style/ConfigsModal.css";

import folder from "../assets/folder-with-files-svgrepo-com.svg";
import Close from "../assets/close-svgrepo-com.svg";
import { useEffect } from "react";

export default function ConfigsModal({ fechar }) {

    async function selecionarPasta() {
        const caminho = await window.electronAPI.selecionarPasta();

        if (!caminho) {
            return;
        }

        console.log("Pasta selecionada:", caminho);

        await window.electronAPI.salvarConfig({
            pastaSelecionada: caminho.replace(/\\/g, "/")
        });
        window.location.reload();
    }

    async function resetarCaminho() {
        await window.electronAPI.salvarConfig({
            pastaSelecionada: "desktop"
        });
        window.location.reload();
    }



    return (
        <>
            <div className="SmokeScreen"></div>
            <div className="ConfigModal">

                <div
                    className="Folder"
                    onClick={selecionarPasta}
                >
                    <img src={folder} alt="" />

                    <p>
                        Selecione a pasta que deseja arrumar
                    </p>
                </div>

                <button className="resetConfigs" onClick={resetarCaminho}>
                    Restaurar configurações
                </button>

                <img
                    src={Close}
                    alt="fechar janela"
                    onClick={fechar}
                />

            </div>
        </>
    );
}