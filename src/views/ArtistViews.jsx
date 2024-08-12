import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavBar } from "../components/nav/ArtistNavBar.jsx"
import { ArtworkList } from "../components/artworks/ArtworkList.jsx"
import { ArtworkDetails } from "../components/artworks/ArtworkDetails.jsx"
import { UpdateArtworkForm } from "../components/forms/UpdateArtworkForm.jsx"
import { CreateArtworkForm } from "../components/forms/CreateArtworkForm.jsx"
import { UserList } from "../components/users/UserList.jsx"
import { UserDetails } from "../components/users/UserDetails.jsx"
import { UserForm } from "../components/forms/UserForm.jsx"
import { useEffect, useState } from "react"
import { getArtistByUserId } from "../services/artistUserService.js"
import { ArtistArtworkList } from "../components/artistUsers/ArtistArtworkList.jsx"

export const ArtistViews = ({ currentUser }) => {
    const [currentArtistUser, setCurrentArtistUser] = useState(0)

    useEffect(() => {
        getArtistByUserId(currentUser.id).then(data => {
            const artistUserObj = data[0]
            setCurrentArtistUser(artistUserObj)
        })
    }, [currentUser])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <ArtistNavBar />
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
                    <Route path="create" element={<CreateArtworkForm currentArtistUser={currentArtistUser} currentUser={currentUser} />} />
                </Route>
                <Route path="personal-artwork" element={<ArtistArtworkList currentArtistUser={currentArtistUser}/>}/>
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