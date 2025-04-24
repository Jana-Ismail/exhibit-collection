import { useEffect, useState } from "react"
import { getArtworksByUserId, getAllGenres, getAllMediums } from "../../services/artworkService.js"
import { Artwork } from "./Artwork.jsx"
import "./Artwork.css"
import { Link, useNavigate } from "react-router-dom"
import { ArtworkFilter } from "./ArtworkFilter.jsx"

export const ArtworkList = ({ currentUser }) => {
    const [allArtworks, setAllArtworks] = useState([])
    const [filteredArtworks, setFilteredArtworks] = useState([])
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [genres, setGenres] = useState([])
    const [mediums, setMediums] = useState([])
    const [selectedFilterOption, setSelectedFilterOption] = useState(0)
    const [genreOption, setGenreOption] = useState(0)
    const [mediumOption, setMediumOption] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const getAndSetUserArtworks = () => {
        // Modified to use getArtworksByUserId
        getArtworksByUserId(currentUser.id).then(artworksArr => {
            setAllArtworks(artworksArr)
        })
    }

    const getAndSetAllGenres = () => {
        getAllGenres().then((genresArr) => {
            setGenres(genresArr)
        })
    }

    const getAndSetMediums = () => {
        getAllMediums().then((mediumsArr) => {
            setMediums(mediumsArr)
        })
    }

    // Initial data fetch
    useEffect(() => {
        getAndSetUserArtworks()
    }, [currentUser.id, showFavoritesOnly, selectedFilterOption])

    // Fetch genres and mediums
    useEffect(() => {
        getAndSetAllGenres()
        getAndSetMediums()
    }, [])

    // Handle favorites filtering
    useEffect(() => {
        if (showFavoritesOnly) {
            const favoritedArtworks = allArtworks.filter(artwork => artwork.isFavorited)
            setFilteredArtworks(favoritedArtworks)
        } else {
            setFilteredArtworks(allArtworks)
        }
    }, [showFavoritesOnly, allArtworks])

    // Handle search and filtering
    useEffect(() => {
        let foundArtworks = allArtworks

        if (showFavoritesOnly) {
            foundArtworks = foundArtworks.filter(artwork => artwork.isFavorited)
        }

        switch (selectedFilterOption) {
            case 1: // Gallery
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.locationViewed.toLowerCase().includes(searchTerm.toLowerCase()))
                break
            case 2: // City
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.cityViewed.toLowerCase().includes(searchTerm.toLowerCase()))
                break
            case 3: // Date
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.dateViewed.includes(searchTerm))
                break
            case 4: // Artist
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()))
                break
            case 5: // Genre
                if (genreOption) {
                    foundArtworks = foundArtworks.filter(artwork => 
                        artwork.genreId === genreOption)
                }
                break
            case 6: // Medium
                if (mediumOption) {
                    foundArtworks = foundArtworks.filter(artwork => 
                        artwork.mediumId === mediumOption)
                }
                break
            case 7: // Nationality
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
                break
            case 8: // Notes
                foundArtworks = foundArtworks.filter(artwork => 
                    artwork.notes.toLowerCase().includes(searchTerm.toLowerCase()))
                break
        }

        setFilteredArtworks(foundArtworks)

    }, [searchTerm, genreOption, mediumOption, selectedFilterOption, allArtworks, showFavoritesOnly])

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
                        onClick={() => {
                            setShowFavoritesOnly(false)
                            setSelectedFilterOption(0)
                        }}
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
                        genres={genres}
                        setMediumOption={setMediumOption}
                        mediums={mediums}
                    />
                </div>
            </div>
            <div className="artwork-collection">
                {filteredArtworks.map(artwork => {
                    return (
                        <Link to={`/collection/${artwork.id}`} key={artwork.id} onClick={(event) => {
                            if (!event.target.closest(".favorite-icon") &&
                                !event.target.closest(".delete-icon")) {
                                navigate(`/collection/${artwork.id}`)
                            } else {
                                event.preventDefault()
                            }
                        }}>
                            <Artwork 
                                artwork={artwork} 
                                key={artwork.id} 
                                getAndSetArtworks={getAndSetUserArtworks}
                            />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}