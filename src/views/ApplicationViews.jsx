import { useState, useEffect } from "react"
// import { UserViews } from "./UserViews.jsx"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { ArtworkList } from "../components/artworks/ArtworkList.jsx"
import { ArtworkDetails } from "../components/artworks/ArtworkDetails.jsx"
import { UserList } from "../components/users/UserList.jsx"
import { UserDetails } from "../components/users/UserDetails.jsx"
import { ArtworkForm } from "../components/forms/ArtworkForm.jsx"
import { UserForm } from "../components/forms/UserForm.jsx"
import { UpdateArtworkForm } from "../components/forms/UpdateArtworkForm.jsx"


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
                    <Route path=":artworkId">
                        <Route index element={<ArtworkDetails currentUser={currentUser}/>} />
                        <Route path="edit" element={<UpdateArtworkForm />}/>
                    </Route>
                    <Route path="create" element={<ArtworkForm currentUser={currentUser} />} />
                </Route>
                <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<UserDetails currentUser={currentUser}/>} />
                </Route>
                <Route path="profile">
                    <Route index element={<UserDetails currentUser={currentUser} />} />
                    <Route path="edit" element={<UserForm currentUser={currentUser} />} />
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