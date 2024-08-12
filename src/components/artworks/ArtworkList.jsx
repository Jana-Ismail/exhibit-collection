import { useEffect, useState } from "react"
import { getAllArtworks, getAllGenres } from "../../services/artworkService.js"
import { Artwork } from "./Artwork"
import "./Artwork.css"
import { Link, useNavigate } from "react-router-dom"
import { ArtworkFilter } from "./ArtworkFilter.jsx"


export const ArtworkList = ({ currentUser }) => {
    const [artworks, setArtworks] = useState([])
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [allArtworks, setAllArtworks] = useState([])
    const [genres, setGenres] = useState([])
    const [filteredArtworks, setFilteredArtworks] = useState([])
    const [selectedFilterOption, setSelectedFilterOption] = useState(0)
    const [genreOption, setGenreOption] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const getAndSetArtworks = () => {
        getAllArtworks().then(artworksArr => {
            setArtworks(artworksArr)
        })
    }

    const getAndSetAllGenres = () => {
        getAllGenres().then((genresArr) => {
            setGenres(genresArr)
        })
    }
    
    // const getAndSetArtworks = () => {
    //     getArtworksByUserId(currentUser?.id).then(artworksArr => {
    //         setArtworks(artworksArr)
    //     })
    // }

    useEffect(() => {
        getAndSetArtworks()
        getAndSetAllGenres()
    }, [])

    useEffect(() => {
        const currentUserArtworks = (artworks.filter(artwork => currentUser.id === artwork.userId))
        setAllArtworks(currentUserArtworks)
    }, [artworks, currentUser])

    useEffect(() => {
        if (showFavoritesOnly) {
            const favoritedArtworks = allArtworks.filter(artwork => artwork.isFavorited)
            setFilteredArtworks(favoritedArtworks)
        } else {
            setFilteredArtworks(allArtworks)
        }
    }, [showFavoritesOnly, artworks, allArtworks])

    useEffect(() => {
        if (selectedFilterOption === 1) {
            const foundArtworks = artworks.filter(artwork => artwork.locationViewed.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArtworks(foundArtworks)
        } else if (selectedFilterOption === 2) {
            const foundArtworks = artworks.filter(artwork => artwork.cityViewed.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArtworks(foundArtworks)
        } else if (selectedFilterOption === 3) {
            const foundArtworks = artworks.filter(artwork => artwork.dateViewed.includes(searchTerm))
            setFilteredArtworks(foundArtworks)
        } else if (selectedFilterOption === 4) {
            const foundArtworks = artworks.filter(artwork => artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArtworks(foundArtworks)
        } else if (selectedFilterOption === 5) {
            // This code is working to filter on first click, but not working if the option is changed again
            // Thinking maybe need to define this functionality in its own function, then call the function in a useEffect when the genreOption state changes?
            // Unsure though.. need to revisit
                // const foundArtworks = artworks.filter(artwork => artwork.genreId === 2)
                // setFilteredArtworks(foundArtworks)
        } else if (selectedFilterOption === 6) {
            // This will be same as genre select functionality once I figure that out
            
        } else if (selectedFilterOption === 7) {
            const foundArtworks = artworks.filter(artwork => artwork.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArtworks(foundArtworks)
        } else {
            const foundArtworks = artworks.filter(artwork => artwork.notes.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArtworks(foundArtworks)
        }

    }, [searchTerm, genreOption, selectedFilterOption])

    return (
        <>
            <div className="collection-header">
                <div className="collection-header-group title-group">
                    <h2 className="collection-title">My Collection</h2>
                    <button 
                        className="add-artwork-btn"
                        onClick={() => {
                            navigate("/collection/create")
                        }}
                    >
                        Add Artwork
                    </button>
                </div>
                <div className="artworks-toggle">
                    <button 
                        className="btn-all-artworks"
                        onClick={() => setShowFavoritesOnly(false)}
                    >
                        All
                    </button>
                    <button 
                        className="btn-favorites"
                        onClick={() => setShowFavoritesOnly(true)}
                    >
                        Favorites
                    </button>
                <ArtworkFilter
                    selectedFilterOption={selectedFilterOption} 
                    setSelectedFilterOption={setSelectedFilterOption}
                    setSearchTerm={setSearchTerm}
                    setGenreOption={setGenreOption}
                />
                </div>
            </div>
            <div className="artwork-collection">
                {filteredArtworks.map(artwork => {
                    return (
                        <Link to={`/collection/${artwork.id}`} onClick={(event) => {
                            if (!event.target.closest(".favorite-icon") &&
                                !event.target.closest(".delete-icon")) {
                                navigate(`/collection/${artwork.id}`)
                            } else {
                                event.preventDefault()
                            }
                        }}>
                            <Artwork artwork={artwork} key={artwork.id} getAndSetArtworks={getAndSetArtworks}/>
                        </Link>
                    )
                })}
            </div>
        </>
        
    )
}