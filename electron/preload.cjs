const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    lerPasta: (caminho) =>
        ipcRenderer.invoke("ler-pasta", caminho),

    getFileIcon: (caminho) =>
        ipcRenderer.invoke("get-file-icon", caminho),

    getSteamGames: () =>
        ipcRenderer.invoke("steam-games"),

    abrirCaminho: (caminho) =>
        ipcRenderer.invoke("abrir-caminho", caminho),

    selecionarPasta: () =>
        ipcRenderer.invoke("selecionar-pasta"),

    salvarConfig: (config) =>
        ipcRenderer.invoke("salvar-config", config),

    lerConfig: () =>
        ipcRenderer.invoke("ler-config")
});