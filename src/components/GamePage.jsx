import { useParams, useLocation } from 'react-router-dom'
import uuid from 'react-uuid'
import '../App.css'

export default function GamePage() {
    const params = useParams()
    const location = useLocation()
    const receivedSearchResults = location.state.searchResults


    return (
        <>
            {receivedSearchResults && <h1 style={{color: 'white'}}>You are in the wrong church pal ¯\_(ツ)_/¯</h1>}
            {!receivedSearchResults
                .filter(e => e.slug === params.slug)
                .map(e => (
                <div key={uuid()}>
                    <div className="gamePage__background" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${e.short_screenshots[1].image})`}}>
                        <div className="gamePage__container">
                            <div className="gamePage__first-row">
                                <div className="gamePage__game-pic" style={{backgroundImage: `url(${e.background_image})`}}></div>
                                <h1 className="gamePage__title" style={{color: 'white'}}>{e.name}</h1>
                                <div className="gamePage__release-year">{new Date(e.released).getFullYear()}</div>
                            </div>
                            <div className="gamePage__second-row">
                                <ul className="gamePage__platforms">
                                    {e.platforms.map(e => <li key={uuid()} className="gamePage__platforms-item">{e.platform.name}</li>)}
                                </ul>
                                {e.metacritic && <><span className='gamePage__metascore'>Metacritic</span><div className='gamePage__metascore'>{e.metacritic}</div></>} 
                                {e.playtime && <><span className='gamePage__playtime-text'>Average playtime</span><div className='gamePage__metascore'>{e.playtime} hours</div></>} 
                            </div>
                            <div className="gamePage__third-row">
                                <ul className="gamePage__genres">
                                    {e.genres.map(e => <li key={uuid()} className="gamePage__genres-item">{e.name}</li>)}
                                </ul> 
                            </div>
                        </div>
                    </div>
                    )
                </div>
            ))}
        </>
    )
}