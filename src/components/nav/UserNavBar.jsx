import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"

export const UserNavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li>
                <Link to="/"><i className="fa-solid fa-house navbar-item home-icon"></i></Link>
            </li>
            <li className="navbar-item">
                <Link to="/collection" className="navbar-link">Collection</Link>
            </li>
            {/* <li className="navbar-item">
                <Link to="/collection/create" className="navbar-link">+ Artwork</Link>
            </li> */}
            <li className="navbar-item">
                <Link to="/users" className="navbar-link">Browse</Link>
            </li>
            <li className="navbar-item">
                <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            {localStorage.getItem("exhibit_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("exhibit_user")
                            navigate("/", { replace: true })
                    }}
                    >
                        Logout
                    </Link>
                </li>
                ) : (
                ""
                )}
        </ul>
    )
}