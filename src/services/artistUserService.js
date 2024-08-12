export const getArtistByUserId = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}&_embed=artists`).then(res => res.json())
}