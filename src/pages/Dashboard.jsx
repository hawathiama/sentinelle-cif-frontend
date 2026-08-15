import { useEffect, useState } from "react";
import { getDashboardSummary, getOpenAlerts } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    getDashboardSummary().then((res) => setSummary(res.data.data));
    getOpenAlerts().then((res) => setAlerts(res.data.data));
  }, []);

  if (!summary) return <p style={{ padding: 30 }}>Chargement...</p>;

  const priorityColor = (p) => (p === "HIGH" ? "red" : p === "MEDIUM" ? "orange" : "green");

  return (
    <div className="dash-app">
      <div className="dash-sidebar">
        <div className="dash-brand">
          <div className="dash-brand-mark">CF</div>
          Coopérative X
        </div>
        <div className="dash-nav">
          <a className="active">📊 Dashboard</a>
          <a>🚩 Alertes</a>
          <a>👤 Profils clients</a>
          <a>🔍 Recherche</a>
        </div>
        <div className="dash-sidebar-foot">DigiCoop-WA+ · Module LBC/FT/FP</div>
      </div>

      <div className="dash-main">
        <div className="dash-topbar">
          <div>
            <h1>Tableau de bord</h1>
            <p>Aperçu des activités de surveillance — aujourd'hui</p>
          </div>
          {user && (
            <div className="dash-agent">
              <div className="dash-avatar">{user.username?.[0]?.toUpperCase()}</div>
              {user.username}
            </div>
          )}
        </div>

        <div className="dash-kpis">
          <div className="dash-kpi">
            <div className="num">{summary.total_clients}</div>
            <div className="label">Clients au total</div>
          </div>
          <div className="dash-kpi risk">
            <div className="num">{summary.risky_clients}</div>
            <div className="label">Clients à risque</div>
          </div>
          <div className="dash-kpi">
            <div className="num">{summary.alerts}</div>
            <div className="label">Alertes actives</div>
          </div>
        </div>

        <div className="dash-panel">
          <h2>Alertes ouvertes</h2>
          {alerts.map((a) => (
            <div className="dash-alert-row" key={a.id}>
              <span className={`dash-dot ${priorityColor(a.priority)}`}></span>
              <span>#{a.id} — {a.alert_type}</span>
              <span className={`dash-badge ${priorityColor(a.priority)}`}>{a.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}