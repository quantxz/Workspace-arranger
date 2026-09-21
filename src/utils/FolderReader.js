export default async function FolderReader(caminho) {
    return await window.electronAPI.lerPasta(caminho);
}