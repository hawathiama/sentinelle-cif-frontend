import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(username, password);
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-body">
      <div className="login-side">
        <div className="login-brand">
          <div className="login-brand-mark">CF</div>
          Coopérative X
        </div>
        <div className="login-side-copy">
          <h2>Sécuriser chaque transaction, protéger chaque client.</h2>
          <p>Plateforme de filtrage et de conformité LBC/FT/FP — programme DigiCoop-WA+.</p>
        </div>
        <div className="login-side-foot">© 2026 · Confédération des Institutions Financières</div>
      </div>

      <div className="login-form-wrap">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Connexion agent</h1>
          <div className="login-sub">Accédez à votre espace de surveillance</div>

          <div className="institution-select">🏢 Coopérative X ⌄</div>

          <label>Identifiant</label>
          <input
            type="text"
            placeholder="ex : f.traore"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="row-between">
            <label className="check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <a>Mot de passe oublié ?</a>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="login-form-foot">Accès réservé au personnel autorisé</div>
        </form>
      </div>
    </div>
  );
}