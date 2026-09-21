export default async function FileIcon(caminho) {
    return await window.electronAPI.getFileIcon(caminho);
}