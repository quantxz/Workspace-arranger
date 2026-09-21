import "../style/SearchBar.css"

export default function SearchBar({ pesquisa, setPesquisa }) {
    return (
        <div className="SearchBar">
            <input
                type="text"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Pesquisar..."
            >
            </input>
        </div>
    )
} 