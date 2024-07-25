import { useState, useEffect } from "react"
// import { UserViews } from "./UserViews.jsx"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { ArtworkList } from "../components/artworks/ArtworkList.jsx"
import { ArtworkDetails } from "../components/artworks/ArtworkDetails.jsx"
import { UserList } from "../components/users/UserList.jsx"


export const ApplicationViews = () => {
  const [ currentUser, setCurrentUser ] = useState({})

  useEffect(() => {
    const localExhibitUser = localStorage.getItem("exhibit_user")
    const exhibitUserObject = JSON.parse(localExhibitUser)

    setCurrentUser(exhibitUserObject)
  }, [])
  
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<h1>Welcome to my blank app!</h1>} />
                <Route path="collection">
                    <Route index element={<ArtworkList currentUser={currentUser}/>} />
                    <Route path=":artworkId" element={<ArtworkDetails />} />
                </Route>
                <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<h1>UserDetails</h1>} />
                </Route>
            </Route>
        </Routes>
    )
 
    }
    
    // return currentUser.isArtist ? (
         //   <UserViews currentUser={currentUser} />
  //   ) : (
      //   <UserViews currentUser={currentUser} />
      //   )