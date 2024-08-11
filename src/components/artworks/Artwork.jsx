import { useEffect, useState } from "react"
import "./Artwork.css"
import { updateArtwork } from "../../services/artworkService"

export const Artwork = ({ artwork, getAndSetArtworks }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isFavoritedSelection, setIsFavoritedSelection] = useState(false)

    useEffect(() => {
        setIsFavoritedSelection(artwork.isFavorited)
    }, [artwork])

    const handleFavoriteIconClick = (event) => {
        setIsFavoritedSelection(!artwork.isFavorited)
            
        const updatedArtwork = {
                id: artwork.id,
                userId: artwork.userId,
                isFavorited: !isFavoritedSelection,
                imageUrl: artwork.imageUrl,
                title: artwork.title,
                artist: artwork.artist,
                nationality: artwork.nationality,
                year: artwork.year,
                genreId: artwork.genreId,
                mediumId: artwork.mediumId,
                locationViewed: artwork.locationViewed,
                dateViewed: artwork.dateViewed,
                cityViewed: artwork.cityViewed,
                notes: artwork.notes,
                dateAdded: artwork.dateAdded,
        }

        updateArtwork(updatedArtwork)

    }

    useEffect(() => {
        getAndSetArtworks()
    }, [isFavoritedSelection])

    return (
        <div className="artwork-collection-card">
            <div 
                className="artwork-card-image"
            > 
                {artwork.imageUrl ? (
                    <div className="image-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img 
                            className="artwork-image"
                            src={artwork.imageUrl}
                            alt={`An image of ${artwork.artist}'s ${artwork.title}`}
                            
                        />
                        {isHovered && (
                            <div className="image-hover-icons">
                                <div className="delete-icon">
                                    {/* <i className="fa-solid fa-trash-can"></i> */}
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                                <div className="favorite-icon" onClick={handleFavoriteIconClick}>
                                    {artwork.isFavorited ? (
                                        <i className="fa-solid fa-star" onClick={handleFavoriteIconClick}></i>
                                    ) : (
                                        <i className="fa-regular fa-star" onClick={handleFavoriteIconClick}></i>
                                    )}
                                    
                                    
                                </div>
                            </div>
                        )}
                    </div> 
                    
                ) : (
                    <img
                        className="artwork-image" 
                        src="../dataVisualizations/MondrianBlackSquare.jpg"
                        alt="A picture of Mondrian's Black Square" 
                    />
                )}
                
            </div>
            
            <div className="artwork-card-details">
                <h2 className="artwork-card-detail artwork-title">{artwork.title}</h2>
                <h2 className="artwork-card-detail">{artwork.artist}</h2>
                <h2 className="artwork-card-detail">{artwork.year}</h2>
            </div>
        </div>
    )
}