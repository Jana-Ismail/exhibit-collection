import "./Artwork.css"

export const Artwork = ({ artwork }) => {
    return (
        <div className="artwork-collection-item">
            <img
                className="artwork-image" 
                src="../dataVisualizations/MondrianBlackSquare.jpg"
                alt="A picture of Mondrian's Black Square" 
            />
            <h2 className="artwork-detail artwork-title">{artwork.title}</h2>
            <h2 className="artwork-detail">{artwork.artist}</h2>
            <h2 className="artwork-detail">{artwork.year}</h2>
        </div>
    )
}