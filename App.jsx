import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'
import '../App.css'
import Loader from './Loader'
import Hotkeys from 'react-hot-keys'

function App() {

  const [popularGames, setPopularGames] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const maxPlatformsToShow = 3;

  function focusSearch() {
    document.getElementById('search-input').focus()
  }

  useEffect(function() {
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
        setSearchResults([])
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
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const currentDate = new Date()

  function clearInputAndResults() {
    setSearchTerm('')
    setSearchResults([])
  }

  function clearResults(event) {
    setSearchResults([])
    setLoading(true)
    setSearchTerm(event.target.value)
  }

  function setInput(game) {
    setSearchTerm(game)
  }

  return (
    <>
      <Hotkeys 
        keyName="alt+enter"
        onKeyUp={focusSearch}
      />
        <nav>
            <h2 className="site__title hover">boxd</h2>
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
        <div className="user" />
        {searchResults.length > 0 && <h3 className="search__games-length hover">Games <span className="search__games-length-number">{searchResults.length}</span></h3>}

        
            {!searchTerm && !loading &&
              <div className="search__most-container">
                <div className="search__most-left-block">
                  <h2 className="search__most-title">Most popular</h2>
                  <span className="search__most-year">2023</span>
                </div>
                <div className="search__most-popular-items">
                  {popularGames.map(e => ( 
                      <div style={{backgroundImage: `url(${e.background_image})`}} key={uuid()} onClick={()=>setInput(e.name)} className="search__most-item">{e.name}</div>
                  ))}
                </div>   
              </div>
            }
        <div className="search__games">
        {loading && <Loader loading={loading}/>}
            {searchResults
                .map((e, index) =>  
                    <div key={uuid()} className="search__game">
                        <span className="search__game-index">{index + 1}</span>
                        <Link to={`/games/${e.slug}`} state={{ searchResults: searchResults }}>
                            <div className="search__game-img hover" style={{backgroundImage: `url(${e.background_image})`}} key={uuid()}></div>
                        </Link>
                        <div className="search__game-vertical-block">
                            <div className="search__game-text">
                                <Link to={`/games/${e.slug}`} state={{ searchResults: searchResults }}>
                                {<div className="search__game-title hover">{e.name}</div>}
                                </Link>
                            <div className="search__game-platforms-block">
                                {e.platforms && e.platforms.length > maxPlatformsToShow ? ( 
                                <>
                                {e.platforms?.
                                    slice(0, maxPlatformsToShow)
                                    .map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`search__game-platforms ${e.platform.name.toLowerCase()}`} />)
                                }
                                <div>+ {e.platforms.length - maxPlatformsToShow}</div>
                                </>    
                                ) : (e.platforms?.
                                    map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`search__game-platforms ${e.platform.name.toLowerCase()}`} />)
                                )}
                            </div>
                            </div>
                            <div className="search__game-release-year">{new Date(e.released).getFullYear()} <span className="search__game-years-since">({currentDate.getFullYear() - new Date(e.released).getFullYear()} years ago)</span></div>
                            <ul className="search__game-genres-block">
                                {e.genres && e.genres.map(e => <li key={uuid()} aria-label={e.name} className="search__game-genre-item hover">{e.name}</li>)}
                            </ul>
                        </div>
                        {e.metacritic && <p style={e.metacritic > 74 ? {backgroundColor: 'green'} : e.metacritic > 49 ? {backgroundColor: 'yellow', color: 'black'} : {backgroundColor: 'red'}} aria-label={e.metacritic} className='search__game-metascore hover'>{e.metacritic}</p>}
                    </div>
                )
            }
        </div>
    </>
    )
}

export default App