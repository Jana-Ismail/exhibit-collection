export const getArtistByUserId = (userId) => {
    return fetch(`http://localhost:8088/artists?userId=${userId}&_expand=user`).then(res => res.json())
}