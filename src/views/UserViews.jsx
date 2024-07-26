import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"

export const UserViews = ({ currentUser }) => {
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
                <Route index element={<h1>Welcome to my blank App!</h1>} />
                <Route path="collection" element={<h1>My collection of images will go here</h1>} />
            </Route>
        </Routes>
    )
}