import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/auth";

interface LoginProps {
  closeModalOnClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginResponse {
  token: string;
  [key: string]: any;
}

const Login: React.FC<LoginProps> = ({
  closeModalOnClickOutside,
  setShowModal,
  setIsLoggedIn,
  setAdminLogin,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password) as LoginResponse;
      if (response && response.token) {
        setIsLoggedIn(true);
        setAdminLogin(true);
        setShowModal(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de la connexion");
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModalOnClickOutside}>
      <div className="modal-content modal-content-login">
        <h2>Se connecter</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Connexion</button>
          <Link to="/premium" onClick={() => setShowModal(false)}>
            <button className="premium">
              <p>Devenir membre Premium</p>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
