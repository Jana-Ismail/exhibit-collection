import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/collection">Collection</Link>
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