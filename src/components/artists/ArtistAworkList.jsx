import { useEffect, useState } from "react"
import { getArtistArtworksByArtistId } from "../../services/artistArtworkService.js"
import { Artwork } from "../artworks/Artwork.jsx"


export const ArtistArtworkList = ( {currentUser} ) => {
    const [artistArtworks, setArtistArtworks] = useState([])
    const [filteredArtistArtworks, setFilteredArtistArtworks] = useState([])

    const getAndSetArtistArtworks = () => {
        getArtistArtworksByArtistId(currentUser.id).then(artworksArr => {
            setArtistArtworks(artworksArr)
        })
    }

    useEffect(() => {
        getAndSetArtistArtworks()
    }, [])

    useEffect (() => {
        setFilteredArtistArtworks(artistArtworks)
    }, [artistArtworks])

    return (
        <div className="personal-artwork-header">
            <h1>My Artwork</h1>
            <div>Artist Statement: {currentUser.artistStatement}</div>
            <div>Website: {currentUser.websiteURL}</div>
            <div>Instagram : @{currentUser.instagramHandle}</div>
            <br></br>
            {filteredArtistArtworks.map(artwork => {
                return <Artwork artwork={artwork} currentUser={currentUser} />
            })}
        </div>
    )
}