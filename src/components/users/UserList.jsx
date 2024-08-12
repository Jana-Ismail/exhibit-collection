import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { Link } from "react-router-dom"

export const UserList = ( { currentUser } ) => {
    const [users, setUsers] = useState([])

    const getAndSetUsers = () => {
        getAllUsers().then((usersArr) => {
            setUsers(usersArr)
        })
    }

    useEffect(() => {
        getAndSetUsers()
    }, [])

    return (
        <div>
            <div className="user-list-container">
            <h2 className="user-list-header">Users</h2>
            <div className="user-cards">
                {users.map((user) => {
                    if (user.id !== currentUser.id) {
                        return(
                            <Link to={`/users/${user.id}`}>
                                <div className="user-card" key={user.id}>
                                    <div className="user-detail">
                                        {user.name} {user.isArtist && (
                                            <span>| Artist</span>
                                        )}
                                    <div className="user-detail">{user.hometown}</div>
                                    </div>
                                    {user.favoriteArtist && (
                                        <div className="user-detail"> Favorite Artist | {user.favoriteArtist}</div>
                                    )}
                                </div>
                                
                            </Link>
                        )
                    }
                })}
            </div>
            </div>
        </div>

    )
}