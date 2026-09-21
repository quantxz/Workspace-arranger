import "../style/ConfigsModal.css";

import folder from "../assets/folder-with-files-svgrepo-com.svg";
import Close from "../assets/close-svgrepo-com.svg";

import { useEffect, useState } from "react";

export default function ConfigsModal({ fechar }) {

    const [apiKey, setApiKey] = useState("");
    const [apiId, setApiId] = useState("");
    const [caminho, setCaminho] = useState("");

    useEffect(() => {
        async function carregarConfig() {
            const config = await window.electronAPI.lerConfig();

            setApiKey(config.apiKey ?? "");
            setApiId(config.apiId ?? "");
            setCaminho(config.pastaSelecionada ?? "desktop");
        }

        carregarConfig();
    }, []);

    async function selecionarPasta() {

        const novoCaminho =
            await window.electronAPI.selecionarPasta();

        if (!novoCaminho) {
            return;
        }

        setCaminho(novoCaminho);
    }
    async function resetarCaminho() {

        await window.electronAPI.salvarConfig({
            pastaSelecionada: "desktop",
            apiKey: "",
            apiId: ""
        });

        window.location.reload();
    }

    async function applyConfigs() {

        await window.electronAPI.salvarConfig({
            pastaSelecionada: caminho,
            apiKey: apiKey,
            apiId: apiId
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
                <input type="text" placeholder="insira sua steam ApiKey"
                    value={apiKey}
                    onChange={(event) =>
                        setApiKey(event.target.value)
                    } />
                <input type="text" placeholder="Insira seu steamId"
                    value={apiId}
                    onChange={(event) =>
                        setApiId(event.target.value)
                    }
                />

                <button className="resetConfigs" onClick={resetarCaminho}>
                    Restaurar configurações
                </button>

                <button className="resetConfigs" onClick={applyConfigs}>
                    aplicar configurações
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