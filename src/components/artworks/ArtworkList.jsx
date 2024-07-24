import { useEffect, useState } from "react"
import { getArtworksByUserId, getUserById } from "../../services/userService"
import { Artwork } from "./Artwork"
import "./Artwork.css"
import { Link } from "react-router-dom"


export const ArtworkList = ({ currentUser }) => {
    const [artworks, setArtworks] = useState([])
    // const [user, setUser] = useState([])

    const getAndSetArtworks = () => {
        getArtworksByUserId(currentUser.id).then(artworksArr => {
            setArtworks(artworksArr)
        })
    }

    // const getAndSetUser = () => {
    //     getUserById(currentUser.id).then(userObj => {
    //         setUser(userObj)
    //     })
    // }

    useEffect(() => {
        getAndSetArtworks()
        // getAndSetUser()
    }, [currentUser])

    return (
        <>
            <h2 className="collection-title">{artworks.user?.collectionTitle}</h2>
            <div className="artwork-collection">
                {artworks.map(artwork => {
                    return (
                        <Link to={`/collection/${artwork.id}`} >
                            <Artwork artwork={artwork} key={artwork.id} />
                        </Link>
                    )
                })}
            </div>
        </>
        
    )
}