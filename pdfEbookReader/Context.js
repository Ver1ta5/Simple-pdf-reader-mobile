import React, { createContext, useContext, useState } from 'react';

const ZoomContext = createContext()

export function ZoomValue({ children }) { 
    const [zoomScale, setZoomScale] = useState(1)
    
    return (
        <ZoomContext.Provider value={{ zoomScale, setZoomScale }}>
            { children}
        </ZoomContext.Provider>
    )
}

export function getZoom() {
    return useContext(ZoomContext);
}
  

const AddBookContext = createContext()

export function AddBook({ children }) { 
    const [eBookFiles, setEBookFiles] = useState([]);
    
    return (
        <AddBookContext.Provider value={{eBookFiles, setEBookFiles }}>
            { children}
        </AddBookContext.Provider>
    )
}

export function getAddBook() {
    return useContext(AddBookContext);
}

const SearchContext = createContext()

export function SearchQuery({ children }) { 
    const [searchQuery, setSearchQuery] = useState('');
    
    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery }}>
            { children}
        </SearchContext.Provider>
    )
}

export function getSearchContext() {
    return useContext(SearchContext);
}


const FavouriteContext = createContext()

export function IsFavouritePage({ children }) { 
    const [isFavouritePage, setIsFavouritePage] = useState(false);
    
    return (
        <FavouriteContext.Provider value={{isFavouritePage, setIsFavouritePage }}>
            { children}
        </FavouriteContext.Provider>
    )
}

export function getFavouritePage() {
    return useContext(FavouriteContext);
}

