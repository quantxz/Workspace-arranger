export default async function SteamReader() {
    return await window.electronAPI.getSteamGames();
}