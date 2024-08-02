export const getArtistArtworksByArtistId = (artistId) => {
    return fetch(`http://localhost:8088/artistArtworks?artistId=${artistId}`).then(res => res.json())
}
