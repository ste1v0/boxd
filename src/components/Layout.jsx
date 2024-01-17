import { Outlet } from 'react-router-dom'
import Search from './Search'
import '../App.css'

export default function Layout({focusSearch, searchTerm, setSearchTerm, clearInputAndResults, clearResults, setHome}) {
    return (
        <>
            <Search setHome={setHome} focusSearch={focusSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearInputAndResults={clearInputAndResults} clearResults={(event) => clearResults(event)}/>
            <Outlet />
        </>
    )
}