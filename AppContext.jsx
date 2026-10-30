import {createContext, useContext, useState, useCallback, useRef, useEffect} from 'react';
import { STAGE, AGE } from '../constants';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [currentStage, setCurrentStage] = useState(STAGE.NAME);
    const [age, setAge] = useState(AGE.KIDS);
    const [categories, setCategories] = useState([]);
    const [movieMood, setMovieMood] = useState('');
    const [language, setLanguage] = useState('english');
    const [chat, setChat] = useState([]);

    const value = {
        currentStage,
        setCurrentStage,
        age,
        setAge,
        categories,
        setCategories,
        movieMood,
        setMovieMood,
        language,
        setLanguage,
        chat,
        setChat
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
export function useApp() {
        const ctx = useContext(AppContext);
        if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
        return ctx;
    }
