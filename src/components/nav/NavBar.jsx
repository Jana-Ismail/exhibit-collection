import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/collection" className="navbar-link">Collection</Link>
            </li>
            <li className="navbar-item">
                <Link to="/users" className="navbar-link">Users</Link>
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