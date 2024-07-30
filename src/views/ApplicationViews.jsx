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
                <Route index element={
                    <div>
                        <h1>Welcome to Exhibit Collection</h1>
                        <div>Start building your collection!</div>
                    </div>
                } />
                <Route path="collection">
                    <Route index element={<ArtworkList currentUser={currentUser}/>} />
                    <Route path=":artworkId">
                        <Route index element={<ArtworkDetails currentUser={currentUser}/>} />
                        <Route path="edit" element={<UpdateArtworkForm />}/>
                    </Route>
                    <Route path="create" element={<ArtworkForm currentUser={currentUser} />} />
                </Route>
                <Route path="users">
                    <Route index element={<UserList currentUser={currentUser}/>} />
                    <Route path=":userId" element={<UserDetails currentUser={currentUser}/>}>
                        {/* <Route path=":userArtworkId" element={<ArtworkDetails />}/> */}
                    </Route>
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