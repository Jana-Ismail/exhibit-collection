import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"

export const UserForm = ( { currentUser } ) => {
    const [user, setUser] = useState()

    const getAndSetUser = () => {
        getUserById(currentUser.id).then((userArr) => {
            const userObj = userArr[0]
            setUser(userObj)
        })
    }

    useEffect(() => {
        getAndSetUser()
    }, [currentUser, user])

    return (
        <form className="profile-update">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        className="form-control" 
                        type="text"
                        value={user.name} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hometown:</label>
                    <input 
                        className="form-control"
                        type="text" 
                        value={user.hometown} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Favorite Artist:</label>
                    <input 
                        className="form-control" 
                        type="text"
                        value={user.favoriteArtist} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Collection Title:</label>
                    <input 
                        className="form-control" 
                        type="text"
                        value={user.collectionTitle} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="save-btn">SAVE</button>
                </div>
            </fieldset>
        </form>
    )
}