import "./Artwork.css"

export const Artwork = ({ artwork }) => {
    return (
        <div className="artwork-collection-card">
            <div className="artwork-card-image"> 
                {artwork.imageUrl ? (
                    <img 
                        className="artwork-image"
                        src={artwork.imageUrl}
                        alt={`An image of ${artwork.artist}'s ${artwork.title}`}
                    />
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