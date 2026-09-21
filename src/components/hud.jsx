import "../style/Hud.css"
import "../style/SearchBar.css"

import FolderRearder from "../utils/FolderReader"
import { useState, useEffect } from "react";
import renderConteudo from "../utils/HudRender";
import SteamReader from "../utils/SteamReader";
import SearchBar from "./SearchBar"

export default function Hud({ selecionado }) {
    const MenuSelected = selecionado;

    const [arquivos, setArquivos] = useState([]);
    const [jogos, setJogos] = useState([]);
    const [caminho, setCaminho] = useState("desktop");

    useEffect(() => {
        async function getCaminho() {
            const config = await window.electronAPI.lerConfig();

            setCaminho(config.pastaSelecionada ?? "desktop");
        }

        getCaminho();
    }, []);

    useEffect(() => {
        async function carregarArquivos() {
            const resultado = await FolderRearder(caminho);
            console.log("Arquivos:", resultado);
            setArquivos(resultado);
        }

        carregarArquivos();
    }, [caminho]);

    useEffect(() => {
        async function testarSteam() {
            const resultados = await SteamReader();
            console.log(resultados.response.games);
            setJogos(resultados.response.games)

            console.log(jogos)
        }

        testarSteam();
    }, []);

    useEffect(() => {
        console.log(
            "Jogos atualizados:",
            jogos.map(jogo => jogo.name)
        );
    }, [jogos]);

    const [pesquisa, setPesquisa] = useState("");

    const arquivosFiltrados = arquivos.filter(arquivo =>
        arquivo.nome
            .toLowerCase()
            .replace(/[.:!?'"-]/g, "")
            .includes(pesquisa.toLowerCase())
    );

    const jogosFiltrados = jogos.filter(jogo =>
        jogo.name
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    return (

        <div className="Hud">
            <SearchBar
                pesquisa={pesquisa}
                setPesquisa={setPesquisa} />
            {renderConteudo(MenuSelected, arquivosFiltrados, jogosFiltrados)}
        </div>
    )
}