import { useEffect, useState } from "react"
import "./Form.css"
import { createArtwork, getAllGenres, getAllMediums } from "../../services/artworkService"
import { useNavigate } from "react-router-dom"

export const ArtworkForm = ( {currentUser} ) => {
    const navigate = useNavigate()
    
    const [artwork, setArtwork] = useState({
        imageUrl: "",
        title: "",
        artist: "",
        nationality: "",
        year: "",
        genreId: 0,
        mediumId: 0,
        locationViewed: "",
        dateViewed: "",
        cityViewed: "",
        notes: "",
    })
    const [genres, setGenres] = useState([])
    const [mediums, setMediums] = useState([])
    const [genreOption, setGenreOption] = useState(0)
    const [mediumOption, setMediumOption] = useState(0)

    const getAndSetGenres = () => {
        getAllGenres().then((genresArr) => {
            setGenres(genresArr)
        })
    }

    const getAndSetMediums = () => {
        getAllMediums().then(mediumsArr => {
            setMediums(mediumsArr)
        })
    }

    useEffect(() => {
        getAndSetGenres()
        getAndSetMediums()
    }, [])

    useEffect(() => {
        if (genreOption) {
            const selectedGenre = genres.filter(genre => genre.id === genreOption)
            const artworkCopy = {...artwork}
            artworkCopy.genre = selectedGenre[0].type
            setArtwork(artworkCopy)
        }
    }, [genreOption])

    useEffect(() => {
        if (mediumOption) {
            const selectedMedium = mediums.filter(medium => medium.id === mediumOption)
            const artworkCopy = {...artwork}
            artworkCopy.medium = selectedMedium[0].type
            setArtwork(artworkCopy)
        }
    }, [mediumOption])

    const handleSave = (event) => {
        event.preventDefault()

        const newArtwork = {
            userId: currentUser.id,
            isFavorited: false,
            imageUrl: artwork.imageUrl,
            title: artwork.title,
            artist: artwork.artist,
            nationality: artwork.nationality,
            year: artwork.year,
            genreId: genreOption,
            mediumId: artwork.mediumId,
            locationViewed: artwork.locationViewed,
            dateViewed: artwork.dateViewed,
            cityViewed: artwork.cityViewed,
            notes: artwork.notes,
            dateAdded: new Date(),
        }

        createArtwork(newArtwork).then(() => {
            navigate("/collection")
        })
    }

    return (
        <div>
            <h2>Create New Artwork</h2>
            <form>
                <fieldset>
                        <div className="form-group">
                            <label>Genre</label>
                            <select 
                                id="artwork-genre"
                                required
                                onChange={(event) => {
                                    setGenreOption(parseInt(event.target.value))
                                }}
                            >
                                <option value="0" disabled>Select a Genre</option>
                                <option value="1">Landscape</option>
                                <option value="2">Portrait</option>
                                <option value="3">Abstract</option>
                                <option value="4">Still Life</option>
                                <option value="5">Other</option>
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label>Medium</label>
                            <select
                                required 
                                id="artwork-medium"
                                onChange={(event) => {
                                    setMediumOption(parseInt(event.target.value))
                                }}
                            >
                                <option value ="0" disabled>Select a Medium</option>
                                <option value="1">Oil Paint</option>
                                <option value="2">Acrylic Paint</option>
                                <option value="3">Charcoal</option>
                                <option value="4">Ink</option>
                                <option value="5">Mixed Media</option>
                                <option value="6">Other</option>
                            </select>
                        </div>
                    </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label>Image URL</label>
                        <input 
                            required
                            className="form-control"
                            type="text"
                            placeholder="URL of new artwork image"
                            value={artwork.imageUrl}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.imageUrl = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label>Title</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Title of artwork"
                            value={artwork.title}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.title = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label>Artist</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Artist name"
                            value={artwork.artist}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.artist = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label>Nationality</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Nationality of artist"
                            value={artwork.nationality}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.nationality = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label>Year</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Year(s) created"
                            value={artwork.year}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.year = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset required>
                    <div className="form-group">
                        <label>Location Viewed</label>
                        <input
                            required 
                            className="form-control"
                            type="text"
                            placeholder="Name of gallery or museum you viewed this artwork"
                            value={artwork.locationViewed}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.locationViewed = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Date Viewed</label>
                        <input
                            required 
                            className="form-control"
                            type="date"
                            value={artwork.date}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.date = event.target.value
                                console.log(event)
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>City Viewed</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="City in which you viewed this artwork"
                            value={artwork.cityViewed}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.cityViewed = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea></textarea>
                    </div>
                </fieldset>
                <fieldset>
                    <button className="submit-btn" onClick={handleSave}>Create Artwork</button>  
                </fieldset>
            </form>
        </div>

    )
}