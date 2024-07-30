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
            <h2>Users</h2>
            {users.map((user) => {
                if (user.id !== currentUser.id) {
                    return(
                        <Link to={`/users/${user.id}`}>
                            <div className="user" key={user.id}>{user.name}</div>
                        </Link>
                    )
                }
            })}
        </div>
    )
}