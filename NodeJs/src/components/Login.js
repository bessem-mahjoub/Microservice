import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [Matricule, setMatricule] = useState("");
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    const { setIsAuthenticated } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isCaptchaValid) {
            alert("Veuillez valider le captcha.");
            return;
        }

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            setMatricule(data.Matricule);
            setLoggedIn(true);
            setIsAuthenticated(true);
        } else {
            alert("Identifiant ou mot de passe incorrect.");
        }
    };

    const handleCaptchaChange = (value) => {
        setIsCaptchaValid(value ? true : false);
    };

    if (loggedIn) {
        let redirectUrl = "https://esprit-tn.com/esponline/online/default.aspx"; // Redirection par défaut

        switch (Matricule) {
            case "omar":
                redirectUrl = "http://localhost:4200/ui-components/add-document";
                break;
            case "mohamed":
                redirectUrl = "http://localhost:4200/ui-components/task";
                break;
            case "ahmed":
                redirectUrl = "http://localhost:4200/ui-components/companies";
                break;
            default:
                redirectUrl = "https://esprit-tn.com/esponline/online/default.aspx";
        }

    
        window.location.href = redirectUrl;
        return null; 
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <ReCAPTCHA
                        sitekey="6Le3U4wmAAAAAG-WfmHRNYkYYWSlIciSFw2njRd9"
                        onChange={handleCaptchaChange}
                    />
                    <button type="submit">Se connecter</button>
                    <div className="register-link">
                        <p>
                            Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
