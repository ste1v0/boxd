import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import '../App.css'

export default function GamePage() {

    const params = useParams()
    const location = useLocation()
    const receivedSearchResults = location.state.searchResults

    const [gameData, setGameData] = useState(null)

    useEffect(function() {
        if (params.slug) {
            fetch(`https://api.rawg.io/api/games/${params.slug}?key=`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Something is wrong with this request')
                    }
                    return res.json()
                })
                .then(data => {
                    setGameData(data)
                })
                .catch(error => console.error('Here is the error:', error.message))
        }
    }, [params.slug])




    return (
        <>
        <div style={{display: 'grid'}}>
            {receivedSearchResults
                .filter(e => e.slug === params.slug)
                .map(e => (
                <div key={uuid()}>
                    <div className="game-page__background" style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)), linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25)), linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.95)), url(${e.short_screenshots[1].image}) center/cover`}}>
                        <div className="game-page__container">
                            <div className="game-page__left-side">
                                <div className="game-page__pic" style={{backgroundImage: `url(${e.background_image})`}}></div>
                                {gameData && <div style={{color: 'white'}}>{gameData.reddit_url}</div>}
                            </div>
                            <div className="game-page__center">
                                <div className="game-page__text">
                                    <h1 className="game-page__title" style={{color: 'white'}}>{e.name}</h1>
                                    <div className="game-page__release-platforms">
                                        <span className="game-page__release-year">{new Date(e.released).toLocaleString('en', { month: 'long'})} {new Date(e.released).getFullYear()}</span>
                                        <div className="game-page__platforms-block">
                                            {e.platforms && e.platforms.length > 5 ? ( 
                                            <>
                                            {e.platforms?.
                                                slice(0, 5)
                                                .map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`game-page__platforms ${e.platform.name.toLowerCase()}`} />)
                                            }
                                            <div>+ {e.platforms.length - 5}</div>
                                            </>    
                                            ) : (e.platforms?.
                                                map(e => <div key={uuid()} aria-label={e.platform.name} title={e.platform.name} className={`game-page__platforms ${e.platform.name.toLowerCase()}`} />)
                                            )}
                                        </div>
                                    </div>
                                    {gameData && <div className="game-page__description">{gameData.description_raw.match(/[^.!?]+[.!?]+/g).slice(0, 5).join(' ')}</div>}
                                </div>
                            </div>
                            <div className="game-page__right-side">
                                <div style={{color: 'white'}}>User actions here</div>
                            </div>
                        </div>
                    </div>
                    )
                </div>
            ))}
        </div>
        </>
    )
}