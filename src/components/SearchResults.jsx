import uuid from 'react-uuid'
import Backdrop from './Backdrop'
import '../App.css'
import { Link } from 'react-router-dom'


export default function SearchResults({searchResults, maxPlatformsToShow, backdrop, dropdown, setDropdown, currentDate}) {
    return (
      <>
        {dropdown && <Backdrop setDropdown={setDropdown}/>}
        <div style={{backgroundColor: 'black'}} className={dropdown ? 'search__dropdown' : 'hidden'}>
            <h3 className="search__games-length hover">Games <span className="search__games-length-number">{searchResults.length}</span></h3>
            {searchResults.map((e, index) => (
            <div key={uuid()} className="search__game">
              <span className="search__game-index">{index + 1}</span>
              <Link to={`/games/${e.slug}`} state={{ searchResults: searchResults }}>
                <div className="search__game-img hover" onClick={() => setDropdown(false)} style={{backgroundImage: `url(${e.background_image})`}} key={uuid()}></div>
              </Link>
              <div className="search__game-vertical-block">
                <div className="search__game-text">
                  <Link to={`/games/${e.slug}`} state={{ searchResults: searchResults }}>
                    {<div className="search__game-title hover" onClick={() => setDropdown(false)}>{e.name}</div>}
                  </Link>
                  <div className="search__game-platforms-block">
                    {e.platforms && e.platforms.length > maxPlatformsToShow ? ( 
                      <>
                        {e.platforms?.slice(0, maxPlatformsToShow).map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`search__game-platforms ${e.platform.name.toLowerCase()}`} />)}
                        <div>+ {e.platforms.length - maxPlatformsToShow}</div>
                      </>    
                    ) : (
                      e.platforms?.map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`search__game-platforms ${e.platform.name.toLowerCase()}`} />)
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
          ))}
        </div>
    </>
  )
}