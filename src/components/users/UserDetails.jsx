import { useParams } from "react-router-dom"
import "./Users.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { ArtworkList } from "../artworks/ArtworkList"

export const UserDetails = ({currentUser}) => {
    const {userId} = useParams()
    const [user, setUser] = useState({})

    const getAndSetUser = () => {
        getUserById(userId).then((userArr) => {
            const userObj = userArr[0]
            setUser(userObj)
        })
    }

    useEffect(() => {
        getAndSetUser()
    }, [userId])

    return (
        <div>
            <h2>User Details</h2>
            <div>Name: {user.name}</div>
            <div>Hometown: {user.hometown}</div>
            <div>Favorite Artist: {user.favoriteArtist}</div>
            <div>Collection Title: {user.collectionTitle}</div>
            <h2>{user.name}'s Collection</h2>
        </div>
    )
}