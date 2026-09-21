const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    lerPasta: (caminho) =>
        ipcRenderer.invoke("ler-pasta", caminho),

    getFileIcon: (caminho) =>
        ipcRenderer.invoke("get-file-icon", caminho),

    getSteamGames: () =>
        ipcRenderer.invoke("steam-games"),

    abrirCaminho: (caminho) =>
        ipcRenderer.invoke("abrir-caminho", caminho)
});