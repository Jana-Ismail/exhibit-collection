import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavBar } from "../components/nav/ArtistNavBar.jsx"
import { ArtworkList } from "../components/artworks/ArtworkList.jsx"
import { ArtworkDetails } from "../components/artworks/ArtworkDetails.jsx"
import { UpdateArtworkForm } from "../components/forms/UpdateArtworkForm.jsx"
import { ArtworkForm } from "../components/forms/ArtworkForm.jsx"
import { UserList } from "../components/users/UserList.jsx"
import { UserDetails } from "../components/users/UserDetails.jsx"
import { UserForm } from "../components/forms/UserForm.jsx"
import { ArtistArtworkList } from "../components/artists/ArtistAworkList.jsx"

export const ArtistViews = ({ currentUser, currentArtistUser }) => {
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
                    <Route index element={<ArtworkList currentUser={currentArtistUser}/>} />
                    <Route path=":artworkId">
                        <Route index element={<ArtworkDetails currentUser={currentArtistUser}/>} />
                        <Route path="edit" element={<UpdateArtworkForm />}/>
                    </Route>
                    <Route path="create" element={<ArtworkForm currentUser={currentArtistUser} />} />
                </Route>
                <Route path="personal-artwork" element={<ArtistArtworkList currentUser={currentArtistUser}/>}/>
                <Route path="users">
                    <Route index element={<UserList currentUser={currentArtistUser}/>} />
                    <Route path=":userId" element={<UserDetails currentUser={currentArtistUser}/>}>
                        {/* <Route path=":userArtworkId" element={<ArtworkDetails />}/> */}
                    </Route>
                </Route>
                <Route path="profile">
                    <Route index element={<UserDetails currentUser={currentArtistUser} />} />
                    <Route path="edit" element={<UserForm currentUser={currentArtistUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}