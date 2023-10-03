import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from './Gallery'
import { DataContext } from '../context/DataContext'

//send request https://itunes.apple.com/lookup?id=909253&entity=album.
//set data to all results except for first item. (api)
// when AristView is rendered show albums
const API_URL = 'https://itunes.apple.com/lookup?entity=album&id='

export default function ArtistView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])
    const [artistData, setArtistData] = useState(null)
    const [message, setMessage] = useState('Search for Music!')


    useEffect(() => {
        const fetchData = async () => {
            // document.title = `${search} Music`
            await new Promise((resolve) => {
                setTimeout(resolve, 5000)
            })
            const response = await fetch(API_URL + id)
            const resData = await response.json()
            setArtistData(resData.results[0])
            if (resData.results.length > 1) {
                setAlbumData(resData.results.slice(1))
                return
            } else {
                return setMessage('Not Found')
            }
        }
        fetchData()
    }, [id])

    if (!artistData) {
        return (
            <div>Loading..</div>
        )
    }

    return (
        <div>
            <h2>Albums for: {artistData.artistName}</h2>
            <p>Artist Data Goes Here!</p>
            <DataContext.Provider value={albumData}>
                <Gallery />
            </DataContext.Provider>
        </div>
    )
}

