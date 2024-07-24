import { useState, useEffect } from "react"
// import { UserViews } from "./UserViews.jsx"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"


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
                <Route path="collection" element={<h1>Collection images will go here!</h1>} />
            </Route>
        </Routes>
    )
 
    }
    
    // return currentUser.isArtist ? (
         //   <UserViews currentUser={currentUser} />
  //   ) : (
      //   <UserViews currentUser={currentUser} />
      //   )