import { useState, useEffect } from "react"
import { UserViews } from "./UserViews.jsx"
import { ArtistViews } from "./ArtistViews.jsx"
import { getArtistByUserId } from "../services/artistService.js"
import { getUserById } from "../services/userService.js"


export const ApplicationViews = () => {
  const [ currentUser, setCurrentUser ] = useState({})
  const [ currentArtistUser, setCurrentArtistUser] = useState({})

  useEffect(() => {
    if (currentUser.isArtist) {
      // getUserById(currentUser.id)
    } else {
      const localExhibitUser = localStorage.getItem("exhibit_user")
      const exhibitUserObject = JSON.parse(localExhibitUser)
  
      setCurrentUser(exhibitUserObject)
    }
  }, [])

  useEffect(() => {
    if (currentUser.isArtist) {
      getArtistByUserId(currentUser.id).then(data => {
        const artistUserObj = data[0]
        setCurrentArtistUser(artistUserObj)
      })
    }
  }, [currentUser])
  
    return currentUser.isArtist ? (
        <ArtistViews currentArtistUser={currentArtistUser}/> 
    ) : (
        <UserViews currentUser={currentUser} />
    )
    
}

// 
