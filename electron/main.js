import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

console.log("ENV PATH:", path.resolve(__dirname, "../.env"));
console.log("STEAM KEY EXISTE:", !!process.env.STEAM_API_KEY);
console.log("STEAM ID:", process.env.STEAM_ID);

async function obterConfigPath() {
    return path.join(
        app.getPath("userData"),
        "config.json"
    );
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }


    });
    win.removeMenu();
    win.maximize();
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
        win.loadURL("http://localhost:5173");
    }
}

ipcMain.handle("ler-pasta", async (event, caminho) => {
    try {
        if (caminho === "desktop") {
            caminho = app.getPath("desktop");
        }

        const arquivos = await fs.readdir(caminho, {
            withFileTypes: true
        });

        return arquivos.map(item => ({
            nome: item.name,
            caminho: `${caminho}\\${item.name}`,
            tipo: item.isDirectory()
                ? "pasta"
                : path.extname(item.name).toLowerCase()
        }));
    } catch (error) {
        console.error("Erro ao ler pasta:", error);
        return [];
    }
});
ipcMain.handle("get-file-icon", async (event, caminho) => {
    try {
        const icon = await app.getFileIcon(caminho, {
            size: "large"
        });

        return icon.toDataURL();
    } catch (error) {
        console.error("Erro ao pegar ícone:", error);
        return null;
    }
});

ipcMain.handle("steam-games", async () => {
    const apiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_ID;

    const url =
        "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/" +
        `?key=${apiKey}` +
        `&steamid=${steamId}` +
        "&include_appinfo=true" +
        "&include_played_free_games=true";
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Steam API retornou ${resposta.status}`);
    }

    return await resposta.json();
});

ipcMain.handle("abrir-caminho", async (event, caminho) => {
    await shell.openPath(caminho);
});

ipcMain.handle("selecionar-pasta", async () => {
    const resultado = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (resultado.canceled) {
        return null;
    }

    return resultado.filePaths[0];
});

ipcMain.handle("salvar-config", async (event, config) => {
    const configPath = await obterConfigPath();

    await fs.writeFile(
        configPath,
        JSON.stringify(config, null, 4),
        "utf-8"
    );

    return true;
});

ipcMain.handle("ler-config", async () => {
    const configPath = await obterConfigPath();

    try {
        const dados = await fs.readFile(configPath, "utf-8");

        return JSON.parse(dados);
    } catch {
        return {};
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});