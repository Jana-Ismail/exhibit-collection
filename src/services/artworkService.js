export const getAllArtworks = () => {
    return fetch(`http://localhost:8088/artworks`).then(res => res.json())
}


export const getArtworksByUserId = (userId) => {
    return fetch(`http://localhost:8088/artworks/?userId=${userId}&_expand=user`).then((res) => res.json())
}

export  const getArtworkById = (artworkId) => {
    return fetch(`http://localhost:8088/artworks?id=${artworkId}&_expand=genre&_expand=medium`).then((res) => res.json())
}
// export  const getArtworkById = (artworkId) => {
//     return fetch(`http://localhost:8088/artworks?id=${artworkId}`).then((res) => res.json())
// }

export const createArtwork = (artwork) => {
    return fetch(
        `http://localhost:8088/artworks`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(artwork),
        }
    )
}

export const getAllGenres = () => {
    return fetch(`http://localhost:8088/genres`).then(res => res.json())
}

export const getAllMediums = () => {
    return fetch(`http://localhost:8088/mediums`).then(res => res.json())
}

export const updateArtwork = (artwork) => {
    return fetch(
        `http://localhost:8088/artworks/${artwork.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(artwork)
        }
    )
}

export const deleteArtwork = (artworkId) => {
    return fetch(
        `http://localhost:8088/artworks/${artworkId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}