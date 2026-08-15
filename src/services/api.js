import axios from "axios";
import {
  mockLoginResponse,
  mockDashboardSummary,
  mockClientsList,
  mockAlertsOpen,
  mockAlertDetail,
} from "../mocks/mockData";

// ⚙️ INTERRUPTEUR PRINCIPAL
// Mets USE_MOCKS à false le jour où le backend Laravel tourne.
export const USE_MOCKS = true;

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: { Accept: "application/json" },
});

// Ajoute automatiquement le token à chaque requête protégée
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirige vers le login si le token est invalide/expiré
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Petit utilitaire pour simuler un temps de réponse réseau en mode mock
const fakeDelay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), 400));

// ---------- AUTH ----------
export const login = (username, password) => {
  if (USE_MOCKS) return fakeDelay(mockLoginResponse);
  return api.post("/auth/login", { username, password });
};

export const logout = () => {
  if (USE_MOCKS) return fakeDelay({ success: true });
  return api.post("/auth/logout");
};

export const getMe = () => {
  if (USE_MOCKS) return fakeDelay(mockLoginResponse.data);
  return api.get("/auth/me");
};

// ---------- DASHBOARD ----------
export const getDashboardSummary = () => {
  if (USE_MOCKS) return fakeDelay(mockDashboardSummary);
  return api.get("/dashboard/summary");
};

// ---------- CLIENTS ----------
export const getClients = () => {
  if (USE_MOCKS) return fakeDelay(mockClientsList);
  return api.get("/clients");
};

// ---------- ALERTES ----------
export const getOpenAlerts = () => {
  if (USE_MOCKS) return fakeDelay(mockAlertsOpen);
  return api.get("/alerts/open");
};

export const getAlertDetail = (id) => {
  if (USE_MOCKS) return fakeDelay(mockAlertDetail);
  return api.get(`/alerts/${id}`);
};

export default api;