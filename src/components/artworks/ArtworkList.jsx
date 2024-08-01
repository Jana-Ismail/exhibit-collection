import { useEffect, useState } from "react"
import { getAllArtworks, getAllGenres } from "../../services/artworkService.js"
import { Artwork } from "./Artwork"
import "./Artwork.css"
import { Link, useNavigate } from "react-router-dom"
import { ArtworkFilter } from "./ArtworkFilter.jsx"


export const ArtworkList = ({ currentUser }) => {
    const [artworks, setArtworks] = useState([])
    const [genres, setGenres] = useState([])
    const [filteredArtworks, setFilteredArtworks] = useState([])
    const [selectedFilterOption, setSelectedFilterOption] = useState(0)
    const [genreOption, setGenreOption] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

                // <select
                //     className="filter-options"
                //     onChange={(event) => {
                //         setSelectedFilterOption(parseInt(event.target.value))
                //     }}
                // >
                //     <option value="0"></option>
                //     <option value="1">Museum/Gallery Viewed</option>
                //     <option value="2">City Viewed</option>
                //     <option value="3">Date Viewed</option>
                //     <option value="4">Artist</option>
                //     <option value="5">Genre</option>
                //     <option value="6">Medium</option>
                //     <option value="7">Nationality</option>
                //     <option value="8">Notes</option>
                // </select>

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
        setFilteredArtworks(currentUserArtworks)
    }, [artworks, currentUser])

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
                <h2 className="collection-title">My Collection</h2>
                <ArtworkFilter
                    selectedFilterOption={selectedFilterOption} 
                    setSelectedFilterOption={setSelectedFilterOption}
                    setSearchTerm={setSearchTerm}
                    setGenreOption={setGenreOption}
                />
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
                {filteredArtworks.map(artwork => {
                    return (
                        <Link to={`/collection/${artwork.id}`} >
                            <Artwork artwork={artwork} key={artwork.id} />
                        </Link>
                    )
                })}
            </div>
        </>
        
    )
}