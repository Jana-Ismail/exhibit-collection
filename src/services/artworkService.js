// export const getArtworks = () => {
//     return fetch(`http:localhost:8088/artworks`).then(res => res.json())
// }


export const getArtworksByUserId = (userId) => {
    return fetch(`http://localhost:8088/artworks/?userId=${userId}&_expand=user`).then((res) => res.json())
}

export  const getArtworkById = (artworkId) => {
    return fetch(`http://localhost:8088/artworks?id=${artworkId}`).then((res) => res.json())
}