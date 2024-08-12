import { useParams, useNavigate, Link } from "react-router-dom"
import "./Users.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { getArtworksByUserId } from "../../services/artworkService"



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
            {/* <h2>User Details</h2> */}
            <div className="profile-details">
                <div className="profile-detail"><span className="profile-description">Name: </span>{user.name}</div>
                <div className="profile-detail"><span className="profile-description">Hometown: </span><span className="profile-info">{user.hometown}</span></div>
                <div className="profile-detail"><span className="profile-description">Favorite Artist: </span>{user.favoriteArtist}</div>
            {!userId ? (                
                <div className="profile-detail"><span className="profile-description">Collection Title: </span>{user.collectionTitle}</div>
            ) : (
                ""
            ) 
            }
            </div>
            
            {userId ? (
                <div className="artwork-collection-section">
                    {user.collectionTitle && user.collectionTitle.toLowerCase() !== "My Collection" ? (
                        <h2 className="artwork-collection-section-header">{user.name}'s Collection</h2>
                    ) : (
                        ""
                    )}
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
                <div className="button-align">
                    <button className="edit-btn" onClick={() => {
                        navigate("/profile/edit")
                    }}>Edit Profile</button>
                </div>
            )}
            
        </div>
    )
}