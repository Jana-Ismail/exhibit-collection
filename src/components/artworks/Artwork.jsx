import "./Artwork.css"

export const Artwork = ({ artwork }) => {
    return (
        <div className="artwork-collection-card">
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
            
            <h2 className="image-detail artwork-title">{artwork.title}</h2>
            <h2 className="image-detail">{artwork.artist}</h2>
            <h2 className="image-detail">{artwork.year}</h2>
        </div>
    )
}