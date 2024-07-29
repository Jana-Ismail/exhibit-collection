import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { getArtworksByUserId } from "../../services/artworkService.js"
import { Artwork } from "./Artwork"
import "./Artwork.css"
import { Link, useNavigate } from "react-router-dom"


export const ArtworkList = ({ currentUser }) => {
    const [artworks, setArtworks] = useState([])
    const navigate = useNavigate()
    // const [user, setUser] = useState([])

    const getAndSetArtworks = () => {
        getArtworksByUserId(currentUser?.id).then(artworksArr => {
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
            <div className="collection-header">
                <h2 className="collection-title">My Collection</h2>
                <button 
                    className="add-artwork-btn"
                    onClick={() => {
                        navigate("/collection/create")
                    }}
                >
                    Add Artwork
                </button>
                
            </div>
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