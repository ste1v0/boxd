import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import uuid from 'react-uuid'
import '../App.css'
import Loader from './Loader'
import Hotkeys from 'react-hot-keys'
import Layout from './Layout'
import GamePage from './GamePage'
import SearchResults from './SearchResults'
import bg from '../assets/horizon.jpg'

function App() {

  const [popularGames, setPopularGames] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [home, setHome] = useState(true)

  const bgProps = {
    background: `
      linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)),
      linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)),
      linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85)),
      url(${bg}) center/cover
    `,
    height: '100vh'
  }

  const backgroundStyle = home ? bgProps : { backgroundColor: 'black' };


  const maxPlatformsToShow = 3;

  function focusSearch() {
    document.getElementById('search-input').focus()
  }

  useEffect(function() {
    setHome(true)
    setLoading(true)
      fetch(`https://api.rawg.io/api/games?dates=2023-01-01,2023-12-31&ordering=-added&key=`)
      .then(res => res.json())
      .then(data => {
        setPopularGames(data.results)
        setLoading(false)
      })
  }, [])

  useEffect(function() {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setDropdown(false)
        setSearchResults([])
        setLoading(true)
        fetch(`https://api.rawg.io/api/games?search=${searchTerm}&page_size=25&key=`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Whoops! Network response was not OK')
          }
          return res.json()
        })
        .then(data => setSearchResults(data.results))
        .catch(error => console.error('Here is the error:', error.message))
        setLoading(false)
        setDropdown(true)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const currentDate = new Date()

  function clearInputAndResults() {
    setSearchTerm('')
    setSearchResults([])
    setDropdown(false)
  }

  function clearResults(event) {
    setSearchResults([])
    setLoading(true)
    setSearchTerm(event.target.value)
    setDropdown(false)
  }

  function setInput(game) {
    setSearchTerm(game)
    setDropdown(false)
  }

  return (
    <div style={ home ? backgroundStyle : {backgroundColor: 'black'}}>
      <Hotkeys 
        keyName="alt+enter"
        onKeyUp={focusSearch}
      />
      <Routes>
        <Route path="/" element={<Layout focusSearch={focusSearch} searchTerm={searchTerm} setHome={setHome} setSearchTerm={setSearchTerm} clearInputAndResults={clearInputAndResults} clearResults={(event) => clearResults(event)}/>}>
          <Route path="/games/:slug" element={<GamePage setHome={setHome} dropdown={dropdown} setDropdown={setDropdown} />}/>
        </Route>
      </Routes>
            {searchTerm && !loading &&
            <>
              <SearchResults currentDate={currentDate} searchResults={searchResults} maxPlatformsToShow={maxPlatformsToShow} dropdown={dropdown} setDropdown={setDropdown} />
            </>}
            {!searchTerm && !loading &&
            <div className="search__home">
              <div className="search__text">
                <span className="search__text-item">Play it or nay</span>
                <span className="search__text-item">Tell your crew anyway</span>
              </div>
              <div className="search__most-container">
                <div className="search__most-left-block">
                  <h2 className="search__most-title">Most popular</h2>
                  <span className="search__most-year">2023</span>
                </div>
                <div className="search__most-popular-items">
                  {popularGames.map(e => ( 
                    <>
                      <div style={{backgroundImage: `url(${e.background_image})`}} key={uuid()} onClick={()=>setInput(e.name)} className="search__most-item">{e.name}</div>
                      </>
                  ))}
                </div>   
              </div>
              </div>
            }
        <div className="search__games">
        {loading && <Loader loading={loading}/>}
        </div>
    </div>
    )
}

export default App