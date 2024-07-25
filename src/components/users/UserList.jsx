import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"
import { Link } from "react-router-dom"

export const UserList = () => {
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
                return(
                    <Link to={`/users/${user.id}`}>
                        <div className="user">{user.name}</div>
                    </Link>
                )
            })}
        </div>
    )
}