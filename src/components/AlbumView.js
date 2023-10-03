import { DataContext } from '../context/DataContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from './Gallery'

const API_URL = 'https://itunes.apple.com/lookup?entity=song&id='

export default function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState(null)
    const [tracksData, setTracksData] = useState([])
    const [message, setMessage] = useState('Search for Music!')

    useEffect(() => {
        const fetchData = async () => {
            // document.title = `${search} Music`
            await new Promise((resolve) => {
                setTimeout(resolve, 5000)
            })
            const response = await fetch(API_URL + id)
            const resData = await response.json()
            setAlbumData(resData.results[0])
            if (resData.results.length > 1) {
                setTracksData(resData.results.slice(1))
                return
            } else {
                return setMessage('Not Found')
            }
        }
        fetchData()
    }, [id])

    if (!albumData) {
        return (
            <div>Loading..</div>
        )
    }
    return (
        <div>
            <h2>Tracks for: {albumData.collectionName}</h2>
            <p>Album Data Goes Here!</p>
            <DataContext.Provider value={tracksData}>
                <Gallery />
            </DataContext.Provider>
            {/* <pre>{JSON.stringify(tracksData, null, 2)}</pre> */}
        </div>
    )
}
