import { useState, useEffect } from "react"
// import { UserViews } from "./UserViews.jsx"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { ArtworkList } from "../components/artworks/ArtworkList.jsx"
import { ArtworkDetails } from "../components/artworks/ArtworkDetails.jsx"
import { UserList } from "../components/users/UserList.jsx"
import { UserDetails } from "../components/users/UserDetails.jsx"
import { ArtworkForm } from "../components/forms/ArtworkForm.jsx"


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
                    <Route path="create" element={<ArtworkForm />} />
                </Route>
                <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<UserDetails currentUser={currentUser}/>} />
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