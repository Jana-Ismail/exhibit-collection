export const getArtworks = () => {
    return fetch(`http:localhost:8088/artworks`).then(res => res.json())
}