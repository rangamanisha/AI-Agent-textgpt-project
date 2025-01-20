import React, { useState } from "react";
import "./styles.css";

const ThankYouForm = () => {
    const [formData, setFormData] = useState({ name: "", amount: "", cause: "" });
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/generate-thankyou", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setResult(data.message);
    };

    return (
        <div className="form-container">
            <h2 className="form-header">Generate Thank-You Message</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Donor Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter donor name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Donation Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        type="text"
                        placeholder="Enter donation amount"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cause">Cause</label>
                    <input
                        id="cause"
                        name="cause"
                        type="text"
                        placeholder="Enter the cause"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-btn">Generate</button>
            </form>
            {result && <div className="result-container">{result}</div>}
        </div>
    );
};

export default ThankYouForm;
