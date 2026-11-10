
import { useState, useEffect, useRef } from 'react';
import { omdbSearch, omdbDetails } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function SearchModal({ onClose }) {
 const { openMoovie } = useApp();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searched, setSearched] = useState(false);
    const [clickingId, setClickingId] = useState(null);

    const inputRef = useRef(null);
    const detailsCache = useRef({});

    useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);


    useEffect(() => {if (movie.imdbID && !detailsCache.current[movie.imdbID]) {
        omdbDetails(movie.imdbID).then(details => {
            detailsCache.current[movie.imdbID] = details;
            setResults(prevResults => prevResults.map(m => m.imdbID === movie.imdbID ? { ...m, details } : m));
        });
    }}, [movie.imdbID]);

    const handleSearch = useCallback(async () => {
        const term = query.trim();
        if (!term) return;
        setSearching(true);
        setSearched(true);
        setResults([]);
        try {
            const searchResults = await omdbSearch(term)).slice(0, 12);
        } catch {
            setResults([]);
        } finally {
            setSearching(false);
            setSearched(true);
        }
     [query];
    
     const handlekey = (e) => {
        if (e.key === 'Enter') handleSearch();
        if (e.key === 'Escape') onClose();
    };

    const handleCardClick = useCallback(async (movie) => {
        if (clickingId) return;
        setClickingId(movie.imdbID);
        const details = await(detailsCache.current[movie.imdbID] || omdbDetails(movie.imdbID)).catch(() => null);
        onClose();
        openMovie(details);
        setClickingId(null);
    }, [clickingId, onClose, openMovie]);