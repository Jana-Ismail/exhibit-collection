import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"

export const UserForm = ( { currentUser } ) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const getAndSetUser = () => {
        getUserById(currentUser.id).then((userArr) => {
            const userObj = userArr[0]
            setUser(userObj)
        })
    }

    useEffect(() => {
        getAndSetUser()
    }, [currentUser])

    const handleSave = (event) => {
        event.preventDefault()

        const updatedUserObj = {
            id: user.id,
            name: user.name,
            email: user.email,
            isArtist: user.isArtist,
            hometown: user.hometown,
            favoriteArtist: user.favoriteArtist,
            collectionTitle: user.collectionTitle
        }

        updateUser(updatedUserObj).then(() => {
            getAndSetUser()
            navigate('/profile')
        })
    }

    return (
        <>
        <h2 className="artwork-form-header">Update Profile</h2>
        <form className="update-profile-container">
                <fieldset className="form-select-elements">
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            className="form-control" 
                            type="text"
                            value={user.name}
                            onChange={(event) => {
                                const userCopy = { ...user }
                                userCopy.name = event.target.value
                                setUser(userCopy)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Hometown:</label>
                        <input 
                            className="form-control"
                            type="text" 
                            value={user.hometown}
                            onChange={(event) => {
                                const userCopy = {...user}
                                userCopy.hometown = event.target.value
                                setUser(userCopy)
                            }}
                        />
                    </div>
                </fieldset>
            <fieldset className="form-select-elements">
                <div className="form-group">
                    <label>Favorite Artist:</label>
                    <input 
                        className="form-control" 
                        type="text"
                        value={user.favoriteArtist}
                        onChange={(event) => {
                            const userCopy = {...user}
                            userCopy.favoriteArtist = event.target.value
                            setUser(userCopy)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Collection Title:</label>
                    <input 
                        className="form-control" 
                        type="text"
                        value={user.collectionTitle} 
                        onChange={(event) => {
                            const userCopy = {...user}
                            userCopy.collectionTitle = event.target.value
                            setUser(userCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="save-btn" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>
        </form>
        </>
    )
}