import { useEffect, useState } from "react"
import { getArtistArtworksByArtistId } from "../../services/artistUserService.js"
import { useNavigate } from "react-router-dom"

export const ArtistArtworkList = ({currentArtistUser}) => {
    const [artistArtworks, setArtistArtworks] = useState([])
    const navigate = useNavigate()

    const getAndSetArtistArtworks = () => {
        getArtistArtworksByArtistId(currentArtistUser.id).then(artworksArr => {
            setArtistArtworks(artworksArr)
        })
    }

    useEffect(() => {
        getAndSetArtistArtworks()
    }, [currentArtistUser])

    return (
        <>
            <div className="collection-header">
                <h2 className="collection-title">My Artwork</h2>
                <button 
                        className="add-artwork-btn"
                        onClick={() => {
                            navigate("/collection/create")
                        }}
                    >
                        Add Artwork
                    </button>
            </div>
            <div className="artwork-collection">
        
        {artistArtworks.map(artwork => {
            return (
                <div className="artwork-collection-card">
                    <div 
                        className="artwork-card-image"
                    > 
                        {artwork.imageUrl ? (
                            <div className="image-container"
                            >
                                <img 
                                    className="artwork-image"
                                    src={artwork.imageUrl}
                                    alt={`An image of ${artwork.artist}'s ${artwork.title}`}
                                    
                                />
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
                        {/* <h2 className="artwork-card-detail">{currentArtistUser.className}</h2> */}
                        <h2 className="artwork-card-detail">{artwork.year}</h2>
                    </div>
                </div>
            )
        })}
      </div>
      </>
    )
}