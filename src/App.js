import React from "react";
import ThankYouForm from "./components/ThankYouForm";
import TranslationForm from "./components/TranslationForm";
import "./styles.css";
import logo from "./assets/logo.png"; // Update the path to match the location of your logo

const App = () => {
    return (
        <div className="app-container">
            <header className="branding-header">
                <img src={logo} alt="Give To Africa Logo" className="logo" />
                <h1 className="brand-title">Give To Africa</h1>
            </header>
            <main>
                <ThankYouForm />
                <TranslationForm />
            </main>
        </div>
    );
};

export default App;
