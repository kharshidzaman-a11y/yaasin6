
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { parseAIText } from '../utils/textParser';
import { STAGE, AGE, CATEGORIES_BY_AGE, MOODS_BY_AGE, LANGUAGES } from '../constants';

function TypingDots() {
    return (
        <div className="chat-row bot-row">
            <div className="bot-avatar"><i className="bi bi-stars"></i></div>
            <div className="bubble bot-bubble">
                <div className="typing-dots"><span /><span /><span /></div>
            </div> 
        </div>
    );
}

function SpecialContent({ content }) {
    const { addMsg, switchage } = useApp();
    const [cats, setCats] = useState([]);
    const [langs, setLangs] = useState(['Any language']);

    if (type === 'mood-greeting') return (
        <div classNmae="choice-row">
        {[['Great day!', 'Have a great day!'], ['Meh day', 'Just a meh day'], ['Rescue me!', 'I need a movie to rescue me!']].map(([text, msg], index) => (
            <button key={index} className="choice-btn" onClick={() => content.onselect(val)}>{label}
                {text}
            </button>
        ))}
        {content.enableTyping && <button className="choice-btn type-btn" onClick={() => {content.enableTyping()}}>Type</button>}
        </div>
    );

    if (type === 'age-picker') return (
        <div className="choice-row">
            {[[AGE.KIDS, 'Kids','Under 13'], [AGE.TEENS, 'Teens','13-17'], [AGE.ADULTS, 'Adults','18+']].map(([age, label], sub) => (
                <button key={age} className="choice-btn" onClick={() => content.onselect(age)}>
                    {label} <span className="choice-sub">{sub}</span>
                </button>
            ))}
        </div>
    );

    if (type === 'category-picker') return (
        const items = CATEGORIES_BY_AGE[content.age] || CATEGORIES_BY_AGE.adult;
        return (
            <div>
                <div className="category-grid">
                    {items.map((category) => (
                        <button key={category.id} className={`category-btn ${cats.includes(category.id) ? 'selected' : ''}`} onClick={() => setCats((prev) => prev.includes(category.id) ? prev.filter((x) => x !== category.id) : [...prev, category.id])}>
                            {category.label}
                        </button>
                    ))}
                </div>
                <button className="confirm-btn" disabled={cats.length === 0} onClick={() => content.onconfirm(cats)}>Let's find your movies!</button>
            </div>
    );
}

if (type === 'mood-picker') {
    const moods = content.age === AGE.KIDS ? MOODS_BY_AGE.kids : MOODS_BY_AGE.other;
    return (
        <div className="choice-row">
            {moods.map((mood) => (
                <button key={mood.value} className="choice-btn content-btn" onClick={() => content.onSelect(mood.value)}>{mood.label}</button>
            ))}
            <button className="confirm-btn" disabled={moods.length === 0} onClick={() => content.onconfirm(moods)}>Let's find your movies!</button>
        </div>
    );
}
