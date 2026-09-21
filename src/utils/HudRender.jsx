import folder from "../assets/folder-with-files-svgrepo-com.svg";
import Pdf from "../assets/pdf-file-svgrepo-com (1).svg"
import Photo from "../assets/photo-svgrepo-com.svg"
import cmd from "../assets/command-window-svgrepo-com.svg"

export default function renderConteudo(MenuSelected, arquivos, jogos) {
    switch (MenuSelected) {
        case "Folders":
            return arquivos
                .filter((arquivo) => arquivo.tipo === "pasta")
                .map((arquivo) => (
                    <div className="Card" key={arquivo.caminho} onClick={() => window.electronAPI.abrirCaminho(arquivo.caminho)}>
                        <img src={folder} alt="Pasta" />
                        <p>{arquivo.nome}</p>
                    </div>
                ));

        case "Games":
            return arquivos
                .filter((arquivo) => arquivo.tipo === ".url")
                .map((arquivo) => (
                    jogos
                        .filter((jogo) => jogo.name.toLowerCase()
                            .replace(/[.:!?'"-]/g, "")
                            .replace(/\s+/g, " ") === arquivo.nome.split(".")[0].toLowerCase())
                        .map(jogo => (
                            <div
                                className="Card CardGame"
                                key={jogo.appid}
                                onClick={() => window.electronAPI.abrirCaminho(arquivo.caminho)}>
                                <img
                                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${jogo.appid}/library_600x900.jpg`}
                                    alt={jogo.name}
                                />

                                <p>{jogo.name}</p>
                            </div>
                        ))
                ));


        case "Programs":
            return arquivos
                .filter(arquivo => [
                    ".exe",
                    ".com",
                    ".bat",
                    ".cmd",
                    ".msi",
                    ".lnk",
                    ".scr",
                    ".ps1"
                ].includes(arquivo.tipo))
                .map((arquivo) => (

                    <div className="Card" key={arquivo.caminho} onClick={() => window.electronAPI.abrirCaminho(arquivo.caminho)}>
                        <img src={cmd} alt="Pasta" />
                        <p>{arquivo.nome}</p>
                    </div>
                ));


        case "Pdf":
            return arquivos
                .filter((arquivo) => arquivo.tipo === ".pdf")
                .map((arquivo) => (
                    <div className="Card" key={arquivo.caminho} onClick={() => window.electronAPI.abrirCaminho(arquivo.caminho)}>
                        <img src={Pdf} alt="Pasta" />
                        <p>{arquivo.nome}</p>
                    </div>
                ));


        case "Photos":
            return arquivos
                .filter(arquivo =>
                    [".jpg", ".jpeg", ".png", ".webp", ".gif", "aseprite", ".bmp"].includes(arquivo.tipo)
                )
                .map((arquivo) => (
                    <div className="Card" key={arquivo.caminho} onClick={() => window.electronAPI.abrirCaminho(arquivo.caminho)}>
                        <img src={Photo} alt="Pasta" />
                        <p>{arquivo.nome}</p>
                    </div>
                ));


        default:
            return null;
    }
}