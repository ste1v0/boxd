import '../App.css'
import { Link } from 'react-router-dom'

export default function Search({searchTerm, setSearchTerm, focusSearch, clearInputAndResults, clearResults, setHome}) {

    function clearSearch() {
        setSearchTerm('')
        setHome(true)
    }
    return (
        <nav>
        <Link to="/">
        <h2 className="site__title hover" onClick={clearSearch}>boxd</h2>
        </Link>
        <form className="search__form">
            <div className="search__form-icon hover" onClick={focusSearch}></div>
            <input id="search-input" className="search__form-input" value={searchTerm} autoComplete="off" placeholder="e.g. Final Fantasy XVI" onChange={(event) => clearResults(event)} />
            {!searchTerm && <div className="search_form-input-hotkeys hover">
              <div className="search__form-input-hotkey">alt</div>
              <span className="search__form-input-hotkey-plus">+</span>
              <div className="search__form-input-hotkey">enter</div>
            </div>}
            {searchTerm && <div className="search__form-input-reset hover" onClick={clearInputAndResults}></div>}
        </form>
    </nav>
    )
}