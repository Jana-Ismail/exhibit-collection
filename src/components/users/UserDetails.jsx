import { useParams, useNavigate } from "react-router-dom"
import "./Users.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { ArtworkList } from "../artworks/ArtworkList"
import { getArtworksByUserId } from "../../services/artworkService"
import { Artwork } from "../artworks/Artwork"

export const UserDetails = ({currentUser}) => {
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [artworks, setArtworks] = useState([])

    const navigate = useNavigate()

    const getAndSetUser = () => {
        if (userId) {
            getUserById(userId).then((userArr) => {
            const userObj = userArr[0]
            setUser(userObj)
            })
        } else {
            getUserById(currentUser.id).then((userArr) => {
                const userObj = userArr[0]
                setUser(userObj)
            })
        }
    }

    const getAndSetArtworks = () => {
        getArtworksByUserId(userId).then((artworksArr) => {
            setArtworks(artworksArr)
        })
    }

    useEffect(() => {
        getAndSetUser()
    }, [userId])

    useEffect(() => {
        getAndSetArtworks()
    }, [user])

    return (
        <div className="profile">
            <h2>User Details</h2>
            <div className="profile-detail">Name: {user.name}</div>
            <div>Hometown: {user.hometown}</div>
            <div>Favorite Artist: {user.favoriteArtist}</div>
            <div>Collection Title: {user.collectionTitle}</div>
            {userId ? (
                <div className="artwork-collection">
                    <div>
                    <h2>{user.name}'s Collection</h2>
                    {artworks.map((artwork) => {
                    return (
                        <>
                            <img
                                className="artwork-image" 
                                src="../dataVisualizations/MondrianBlackSquare.jpg"
                                alt="A picture of Mondrian's Black Square" 
                            />
                        </>
                        
                        )
                    }
                )}
                    </div>
                </div>
            ) : (
                <button className="edit-btn" onClick={() => {
                    navigate("/profile/edit")
                }}>Edit Profile</button>
            )}
            
        </div>
    )
}