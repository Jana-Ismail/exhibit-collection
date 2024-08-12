import { useEffect, useState } from "react"
import "./Form.css"
import { createArtistArtwork, createArtwork, getAllGenres, getAllMediums } from "../../services/artworkService"
import { useNavigate } from "react-router-dom"

export const CreateArtworkForm = ( {currentUser, currentArtistUser} ) => {
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

    const [artistArtwork, setArtistArtwork] = useState({
        artistId: 0,
        title: "",
        nationality: "",
        year: "",
        genreId: 0,
        mediumId: 0,
        isForSale: false,
        isPurchased: false,
        notes: "",
        dateAdded: "",
        notes: ""
    })

    const [genres, setGenres] = useState([])
    const [mediums, setMediums] = useState([])
    const [genreOption, setGenreOption] = useState(0)
    const [mediumOption, setMediumOption] = useState(0)
    const [imageData, setImageData] = useState(null)
    const [isPersonalArtwork, setIsPersonalArtwork] = useState(false)

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
            
            if (!isPersonalArtwork) {
                const artworkCopy = {...artwork}
                artworkCopy.genreId = selectedGenre[0].type
                setArtwork(artworkCopy)
            } else {
                const artistArtworkCopy = {...artistArtwork}
                artistArtworkCopy.genreId = selectedGenre[0].type
                setArtistArtwork(artistArtworkCopy)
            }
        }
    }, [genreOption])

    useEffect(() => {
        if (mediumOption) {
            const selectedMedium = mediums.filter(medium => medium.id === mediumOption)
            
            if (!isPersonalArtwork) {
                const artworkCopy = {...artwork}
                artworkCopy.mediumId = selectedMedium[0].type
                setArtwork(artworkCopy)
            } else {
                const artistArtworkCopy = {...artistArtwork}
                artistArtworkCopy.mediumId = selectedMedium[0].type
                setArtistArtwork(artistArtworkCopy)
            }
        }
    }, [mediumOption])

    const handleSubmit = (event) => {
        event.preventDefault()

        let imageUrlData = ""
        if (imageData) {
            imageUrlData = imageData
        }


        const newArtwork = {
            userId: currentUser.id,
            isFavorited: false,
            // imageUrl: artwork.imageUrl,
            imageUrl: imageUrlData,
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

    const handleArtistArtworkSubmit = (event) => {
        event.preventDefault()

        let imageUrlData = ""
        if (imageData) {
            imageUrlData = imageData
        }

        const newArtistArtwork = {
            artistId: currentArtistUser.id,
            imageUrl: imageUrlData,
            title: artistArtwork.title,
            nationality: artistArtwork.nationality,
            year: artistArtwork.year,
            genreId: genreOption,
            mediumId: mediumOption,
            isForSale: false,
            isPurchased: false,
            notes: artistArtwork.notes,
            dateAdded: new Date()
        }

        createArtistArtwork(newArtistArtwork).then(
            navigate("/personal-artwork")
        )
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageData(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <h2 className="artwork-form-header">Create New Artwork</h2>
            {currentUser.isArtist && (
                <div className="artwork-type-select">
                    <label>Is this your personal artwork?</label>
                    <input type="radio" name="artwork-type" value="yes" onChange={() => setIsPersonalArtwork(true)}/>Yes
                    <input type="radio" name="artwork-type" value="no" onChange={() => setIsPersonalArtwork(false)}/> No
                </div>  
            )}
            <div className="image-upload">
                <label>Upload Image: </label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
                {imageData && (
                    <div className="image-preview-container">
                            {/* <div>Preview:</div> */}
                            <img src={imageData} alt="Artwork Preview" className="image-preview"/>
                    </div>
                )}
            {isPersonalArtwork ? (
                <form onSubmit={handleArtistArtworkSubmit}>
                    <fieldset className="form-select-elements">
                        <div className="form-group">
                            <label>Genre</label>
                            <select
                                className="form-select-element" 
                                id="artwork-genre"
                                required
                                onChange={(event) => {
                                    setGenreOption(parseInt(event.target.value))
                                }}
                            >
                                <option value="0">Select a Genre</option>
                                <option value="1">Landscape</option>
                                <option value="2">Portrait</option>
                                <option value="3">Abstract</option>
                                <option value="4">Still Life</option>
                                <option value="5">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Medium</label>
                            <select
                                className="form-select-element" 
                                required 
                                id="artwork-medium"
                                onChange={(event) => {
                                    setMediumOption(parseInt(event.target.value))
                                }}
                            >
                                <option value="0">Select a Medium</option>
                                <option value="1">Oil Paint</option>
                                <option value="2">Acrylic Paint</option>
                                <option value="3">Charcoal</option>
                                <option value="4">Ink</option>
                                <option value="5">Mixed Media</option>
                                <option value="6">Other</option>
                            </select>
                        </div>
                </fieldset>
                <fieldset className="form-select-elements">
                    <div className="form-group">
                    <label>Title</label>
                        <input 
                            className="form-control"
                            required
                            type="text"
                            placeholder="Title of artwork"
                            value={artistArtwork.title}
                            onChange={(event) => {
                                const artistArtworkCopy = { ...artistArtwork }
                                artistArtworkCopy.title = event.target.value
                                setArtistArtwork(artistArtworkCopy)
                            }}
                        />
                    </div>
                <div className="form-group">
                    <label>Year</label>
                        <input 
                            className="form-control"
                            required
                            type="text"
                            placeholder="Year(s) created"
                            value={artistArtwork.year}
                            onChange={(event) => {
                                const artistArtworkCopy = { ...artistArtwork }
                                artistArtworkCopy.year = event.target.value
                                setArtistArtwork(artistArtworkCopy)
                            }}
                            />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group artwork-notes">
                        <label>Notes</label>
                        <textarea 
                            rows="6"
                            onChange={(event) => {
                                const artistArtworkCopy = {...artistArtwork}
                                artistArtworkCopy.notes = event.target.value
                                setArtistArtwork(artistArtworkCopy)
                            }}
                        ></textarea>
                    </div>
                </fieldset>
                <fieldset className="form-group submit">
                    <button type="submit" className="submit-btn">Create Artwork</button>
                </fieldset>
            </form>

            ) : (
                <>
            <form onSubmit={handleSubmit}>
                {/* <fieldset>
                    <div className="form-group image-url">
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
                </fieldset> */}
                <fieldset className="form-select-elements">
                        <div className="form-group">
                            <label>Genre</label>
                            <select
                                className="form-select-element" 
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
                        <div className="form-group">
                            <label>Medium</label>
                            <select
                                className="form-select-element" 
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
                <fieldset className="form-select-elements">
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
                <fieldset className="form-select-elements">
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
                <fieldset className="form-select-elements">
                    <div className="form-group artwork-locationViewed">
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
                <fieldset className="form-select-elements">
                    <div className="form-group artwork-dateViewed">
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
                    <div className="form-group artwork-cityViewed">
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
                    <div className="form-group artwork-notes">
                        <label>Notes</label>
                        <textarea rows="6"></textarea>
                    </div>
                </fieldset>
                <fieldset className="form-group submit">
                    <button type="submit" className="submit-btn">Create Artwork</button>  

                </fieldset>
                
            </form>
            </>
            )}
            </div>

    )
}