import React, { useState } from "react";
import "./styles.css";

const TranslationForm = () => {
    const [text, setText] = useState("");
    const [targetLang, setTargetLang] = useState("es");
    const [translatedText, setTranslatedText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, target_lang: targetLang }),
        });
        const data = await response.json();
        setTranslatedText(data.translated_text);
    };

    return (
        <div className="form-container">
            <h2 className="form-header">Translate Text</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Text to Translate</label>
                    <textarea
                        id="text"
                        rows="4"
                        placeholder="Enter text to translate"
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="targetLang">Target Language</label>
                    <select id="targetLang" onChange={(e) => setTargetLang(e.target.value)}>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="sw">Swahili</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Translate</button>
            </form>
            {translatedText && <div className="result-container">{translatedText}</div>}
        </div>
    );
};

export default TranslationForm;
