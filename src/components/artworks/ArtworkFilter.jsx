import { useState } from "react"

export const ArtworkFilter = ( {
    selectedFilterOption, 
    setSelectedFilterOption, 
    setSearchTerm, 
    setGenreOption} ) => {

    return (
        <div className="filter-bar">
            <div className="filter-groups">
                <div className="filter-by-group">
                    <label>Filter By: </label>
                    <select
                        className="filter-options"
                        onChange={(event) => {
                            setSelectedFilterOption(parseInt(event.target.value))
                        }}
                    >
                        <option value="0">(Select)</option>
                        <option value="1">Gallery Viewed</option>
                        <option value="2">City Viewed</option>
                        <option value="3">Date Viewed</option>
                        <option value="4">Artist</option>
                        <option value="5">Genre</option>
                        <option value="6">Medium</option>
                        <option value="7">Nationality</option>
                        <option value="8">Notes</option>
                    </select>
                </div>
                <div className="filter-input-group">
                    {selectedFilterOption !== 5 ? (
                        <input
                            type="text"
                            placeholder="Search Artworks"
                            onChange={(event) => {setSearchTerm(event.target.value)}}
                            className="filter-input"
                        />
                        ) : (
                        <select
                            className="form-select-element" 
                            required 
                            id="artwork-genre"
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
                        )
                    }
                </div>         
            </div>
        </div>
    )
}