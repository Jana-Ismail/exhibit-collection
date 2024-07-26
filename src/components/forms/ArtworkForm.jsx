import { useState } from "react"
import "./Form.css"
import { createArtwork } from "../../services/artworkService"

export const ArtworkForm = ( {currentUser} ) => {
    const [artwork, setArtwork] = useState({
        imageUrl: "",
        title: "",
        artist: "",
        nationality: "",
        year: "",
        genre: "",
        medium: "",
        locationViewed: "",
        dateViewed: "",
        cityViewed: "",
        notes: "",
    })

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
            genre: artwork.genre,
            medium: artwork.medium,
            locationViewed: artwork.locationViewed,
            dateViewed: artwork.dateViewed,
            cityViewed: artwork.cityViewed,
            notes: artwork.notes,
            dateAdded: new Date(),
        }

        createArtwork(newArtwork)
    }

    return (
        <div>
            <h2>Create New Artwork</h2>
            <form>
                <fieldset>
                    <div className="form-group">
                    <label>Image URL</label>
                        <input 
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
                <fieldset>
                    <div className="form-group">
                        <label>Genre</label>
                        <select id="artwork-genre">
                            <option disabled>Select a Genre</option>
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
                        <select id="artwork-medium">
                            <option disabled>Select a Medium</option>
                            <option value="1">Oil Paint</option>
                            <option value="2">Acrylic Paint</option>
                            <option value="3">Charcoal</option>
                            <option value="4">Mixed Media</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>Location Viewed</label>
                        <input 
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
                            className="form-control"
                            type="date"
                            value={artwork.date}
                            onChange={(event) => {
                                const artworkCopy = { ...artwork }
                                artworkCopy.date = event.target.value
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
                <button className="submit-btn" onClick={handleSave}>Create Artwork</button>  
            </form>
        </div>

    )
}