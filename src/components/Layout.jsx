import { Outlet } from 'react-router-dom'
import Search from './Search'

export default function Layout({focusSearch, searchTerm, setSearchTerm, clearInputAndResults, clearResults}) {
    return (
        <>
            <Search focusSearch={focusSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearInputAndResults={clearInputAndResults} clearResults={(event) => clearResults(event)}/>
            <Outlet />
        </>
    )
}