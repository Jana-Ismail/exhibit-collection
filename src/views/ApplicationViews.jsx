import { useState, useEffect } from "react"
import { UserViews } from "./UserViews.jsx"


export const ApplicationViews = () => {
  const [ currentUser, setCurrentUser ] = useState({})

  useEffect(() => {
    const localExhibitUser = localStorage.getItem("exhibit_user")
    const exhibitUserObject = JSON.parse(localExhibitUser)

    setCurrentUser(exhibitUserObject)
  }, [])
  
  return currentUser.isArtist ? (
  <UserViews currentUser={currentUser} />
) : (
  <UserViews currentUser={currentUser} />
)
}