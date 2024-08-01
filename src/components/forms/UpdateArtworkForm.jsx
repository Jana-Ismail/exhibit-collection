import { useEffect, useState } from "react"
import "./Form.css"
import { getAllGenres, getAllMediums, getArtworkById, updateArtwork } from "../../services/artworkService"
import { useNavigate, useParams } from "react-router-dom"

export const UpdateArtworkForm = () => {
    const {artworkId} = useParams()
    const navigate = useNavigate()
    
    const [artwork, setArtwork] = useState({})

    const getAndSetArtwork = () => {
        getArtworkById(artworkId).then((artworkObj) => {
            setArtwork(artworkObj[0])
        })
    }

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
        getAndSetArtwork()
        getAndSetGenres()
        getAndSetMediums()
    }, [artworkId])

    const handleSave = (event) => {
        event.preventDefault()

        const updatedArtwork = {
            id: artworkId,
            userId: artwork.userId,
            isFavorited: false,
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

        updateArtwork(updatedArtwork).then(() => {
            navigate(`/collection/${artworkId}`)
        })
    }

    return (
        <div>
            <h2>Update Artwork</h2>
            <form>
                <fieldset>
                        <div className="form-group">
                            <label>Genre</label>
                            <select 
                                id="artwork-genre"
                                required
                                value={artwork.genreId}
                                onChange={(event) => {
                                    const copy = {...artwork}
                                    copy.genreId = parseInt(event.target.value)
                                    setArtwork(copy)
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
                                value={artwork.mediumId}
                                onChange={(event) => {
                                    const copy = {...artwork}
                                    copy.mediumId = parseInt(event.target.value)
                                    setArtwork(copy)
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
                            className="form-control"
                            type="text"
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
                <fieldset>
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
                                artworkCopy.dateViewed = event.target.value
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
                        <textarea
                            className="form-control"
                            type="text"
                            value={artwork.notes}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.notes = event.target.value
                                setArtwork(artworkCopy)
                            }}
                        ></textarea>
                    </div>
                </fieldset>
                <button className="edit-btn" onClick={handleSave}>Save Artwork</button>  
            </form>
        </div>

    )
}