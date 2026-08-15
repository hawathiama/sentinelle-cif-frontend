// Données fictives — structures identiques au contrat API V1
export const mockLoginResponse = {
  success: true,
  message: "Connexion réussie.",
  data: {
    token: "fake-sanctum-token-123",
    user: {
      id: 1,
      username: "admin.test",
      agency: {
        id: 1,
        code: "AG001",
        name: "Bamako Centre",
        city: "Bamako",
      },
      role: {
        id: 1,
        name: "ADMIN",
        description: "Administrateur de la plateforme",
      },
      created_at: "2026-08-14T16:55:11.000000Z",
    },
  },
};

export const mockDashboardSummary = {
  success: true,
  data: {
    total_clients: 10189,
    risky_clients: 124,
    alerts: 18,
  },
};

export const mockClientsList = {
  success: true,
  message: "Clients récupérés avec succès.",
  data: [
    {
      client_id: 10307,
      client_number: "SAN-ENTITY-8",
      client_type: "ENTITY",
      customer_name: "CIMEX IBERICA",
      is_pep: 0,
      risk_level: null,
      risk_score: "0.00",
      alert_count: 0,
      transaction_count: 0,
      total_volume: "0.00",
    },
    {
      client_id: 10412,
      client_number: "BKO-IND-42",
      client_type: "INDIVIDUAL",
      customer_name: "Kadidia Traoré",
      is_pep: 1,
      risk_level: "HIGH",
      risk_score: "87.00",
      alert_count: 3,
      transaction_count: 56,
      total_volume: "2450000.00",
    },
    {
      client_id: 10521,
      client_number: "BKO-IND-77",
      client_type: "INDIVIDUAL",
      customer_name: "Aïssata Sangaré",
      is_pep: 0,
      risk_level: "MEDIUM",
      risk_score: "42.00",
      alert_count: 1,
      transaction_count: 12,
      total_volume: "320000.00",
    },
  ],
  meta: {
    current_page: 1,
    last_page: 510,
    per_page: 20,
    total: 10189,
  },
};

export const mockAlertsOpen = {
  success: true,
  data: [
    {
      id: 4521,
      client_id: 10412,
      transaction_id: 98213,
      alert_type: "LARGE_AMOUNT",
      priority: "HIGH",
      status: "OPEN",
      created_at: "2026-08-14T09:14:00.000000Z",
    },
    {
      id: 4488,
      client_id: 10412,
      transaction_id: 98150,
      alert_type: "STRUCTURING",
      priority: "MEDIUM",
      status: "OPEN",
      created_at: "2026-08-13T15:02:00.000000Z",
    },
  ],
};

export const mockAlertDetail = {
  success: true,
  data: {
    alert: {
      id: 4521,
      client_id: 10412,
      transaction_id: 98213,
      alert_type: "LARGE_AMOUNT",
      priority: "HIGH",
      status: "OPEN",
      created_at: "2026-08-14T09:14:00.000000Z",
    },
    actions: [],
    investigations: [],
    risk_assessments: [
      {
        id: 1,
        client_id: 10412,
        transaction_id: 98213,
        risk_type: "TRANSACTION",
        score: 87,
        risk_level: "HIGH",
        reason: "Montant inhabituel détecté",
        source: "aml_engine",
        created_at: "2026-08-14T09:14:00.000000Z",
      },
    ],
  },
};