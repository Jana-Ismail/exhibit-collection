import { useEffect, useState } from "react"
import "./Artwork.css"

export const Artwork = ({ artwork }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        setIsFavorited(artwork.isFavorited)
    }, [artwork])

    const handleFavoriteIconClick = (event) => {
        event.stopPropagation()
        setIsFavorited(!isFavorited)
    }

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
                            <>
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
                            </>
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