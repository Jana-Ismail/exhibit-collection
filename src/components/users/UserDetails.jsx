import { useParams, useNavigate, Link } from "react-router-dom"
import "./Users.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { getArtworksByUserId } from "../../services/artworkService"



export const UserDetails = ({currentUser}) => {
    const {userId} = useParams()
    console.log(userId)
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
            {currentUser ? (                <div>Collection Title: {user.collectionTitle}</div>
) : ("") 
            }
            
            {userId ? (
                <div className="artwork-collection-section">
                    <h2>{user.name}'s Collection</h2>
                    <div className="artwork-collection">
                    {artworks.map((artwork) => {
                    return (
                        <div className="artwork-collection-card" key={artwork.id}>
                                <img
                                    className="artwork-image" 
                                    src={artwork.imageUrl}
                                    alt={`An image of ${artwork.artist}'s ${artwork.title}`} 
                                />
                        </div>
                        
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