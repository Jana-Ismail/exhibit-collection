import { useNavigate, useParams } from "react-router-dom"
import "./Artwork.css"
import { useEffect, useState } from "react"
import { deleteArtwork, getArtworkById } from "../../services/artworkService.js"

export const ArtworkDetails = ( {currentUser} ) => {
    const { artworkId } = useParams()
    const [ artwork, setArtwork ] = useState([])
    const navigate = useNavigate()

    const getAndSetArtwork = () => {
        getArtworkById(artworkId).then((data) => {
            const artworkObj = data[0]
            setArtwork(artworkObj)
        })

    }

    useEffect(() => {
        getAndSetArtwork()
    }, [currentUser, artworkId])

    const handleDelete = () => {
        deleteArtwork(artworkId).then(() => {
            navigate("/collection")
        })
    }

    return (
        <div>
            <div className="artwork-details-header">
                <h1>Artwork Details</h1>
                <div className="btn-container">
                    {currentUser.id === artwork.userId ? (
                        <div>
                            <button 
                                className="edit-btn"
                                onClick={(event) => {
                                    navigate(`/collection/${artworkId}/edit`)
                                }}
                            >
                                Edit
                            </button>
                            <button 
                                className="delete-btn-icon"
                                onClick={handleDelete}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

            </div>
            <div className="artwork-details-container">
                <div className="artwork-details-section">
                    <img 
                        className="artwork-image-detail"
                        src={artwork.imageUrl}
                        alt={`An image of ${artwork.artist}'s ${artwork.title}`}
                    />
                </div>
                <div className="artwork-details-section">
                    <div className="artwork-details">
                        <div className="artwork-detail">
                            <span className="detail-description">Title : </span>
                            {artwork.title ? (artwork.title) : ("Untitled")}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Artist : </span>
                            {artwork.artist}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Nationality : </span>
                            {artwork.nationality}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Year : </span>
                            {artwork.year}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Medium : </span>
                            {artwork.medium?.type}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Genre : </span>
                            {artwork.genre?.type}
                        </div>
                    </div>
                    <div className="viewing-details">
                        <div className="artwork-detail">
                            <span className="detail-description">Location Viewed : </span>
                            {artwork.locationViewed}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Date Viewed : </span>
                            {artwork.dateViewed}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">City Viewed : </span>
                            {artwork.cityViewed}
                        </div>
                        <div className="artwork-detail">
                            <span className="detail-description">Notes : </span>
                            {artwork.notes}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}