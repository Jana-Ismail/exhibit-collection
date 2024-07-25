import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userService"

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
                    <div>{user.name}</div>
                )
            })}
        </div>
    )
}