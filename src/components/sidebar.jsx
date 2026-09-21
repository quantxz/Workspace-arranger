import "../style/Sidebar.css"
import folder from "../assets/folder-with-files-svgrepo-com (1).svg";
import joystick from "../assets/joystick-svgrepo-com.svg"
import Console from "../assets/console-svgrepo-com.svg"
import Photo from "../assets/photo-heart-svgrepo-com.svg"
import Pdf from "../assets/pdf-file-svgrepo-com.svg"
export default function Sidebar({ selecionado, setSelecionado }) {

    return (
        <div className="Sidebar">
            <div className="Menu">
                <div
                    className={`Item Folders ${selecionado === "Folders" ? "Selected" : ""}`}
                    onClick={() => setSelecionado("Folders")}
                >
                    <img src={folder} alt="Pastas" />
                </div>

                <div
                    className={`Item Games ${selecionado === "Games" ? "Selected" : ""}`}
                    onClick={() => setSelecionado("Games")}
                >
                    <img src={joystick} alt="Jogos" />
                </div>

                <div
                    className={`Item Programs ${selecionado === "Programs" ? "Selected" : ""}`}
                    onClick={() => setSelecionado("Programs")}
                >
                    <img src={Console} alt="Programas" />
                </div>

                <div
                    className={`Item Pdfs ${selecionado === "Pdf" ? "Selected" : ""}`}
                    onClick={() => setSelecionado("Pdf")}
                >
                    <img src={Pdf} alt="Pdfs" />
                </div>

                <div
                    className={`Item Photos ${selecionado === "Photos" ? "Selected" : ""}`}
                    onClick={() => setSelecionado("Photos")}
                >
                    <img src={Photo} alt="Fotos" />
                </div>
            </div>
        </div>
    )
}