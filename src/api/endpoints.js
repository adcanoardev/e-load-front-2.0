import { api, apiMultipart } from "./client";

// ─── Users ────────────────────────────────────────────────────────────────────
export const usersApi = {
    login:       (data)         => api.post("users/login", data),
    register:    (formData)     => apiMultipart.post("users", formData),
    checkSession:()             => api.get("users/check"),
    getAll:      ()             => api.get("users"),
    getById:     (id)           => api.get(`users/${id}`),
    update:      (id, formData) => apiMultipart.put(`users/${id}`, formData),
    updatePatch: (id, data)     => api.patch(`users/${id}`, data),
    remove:      (id)           => api.delete(`users/${id}`),
};

// ─── Stations ────────────────────────────────────────────────────────────────
export const stationsApi = {
    getAll:      ()             => api.get("stations"),
    getAllAdmin:  ()             => api.get("stations/admin"),
    getById:     (id)           => api.get(`stations/${id}`),
    create:      (data)         => api.post("stations", data),
    update:      (id, data)     => api.put(`stations/${id}`, data),
    remove:      (id)           => api.delete(`stations/${id}`),
};

// ─── Spots ───────────────────────────────────────────────────────────────────
export const spotsApi = {
    getAll:         ()          => api.get("spots"),
    getByStation:   (id)        => api.get(`spots/station/${id}`),
    getByUser:      (id)        => api.get(`spots/user/${id}`),
    create:         (data)      => api.post("spots", data),
    update:         (id, data)  => api.put(`spots/${id}`, data),
    updateState:    (id, state) => api.patch(`spots/${id}`, { state }),
    remove:         (id)        => api.delete(`spots/${id}`),
};

// ─── Comments ────────────────────────────────────────────────────────────────
export const commentsApi = {
    getAll:       ()            => api.get("comments"),
    getByStation: (id)          => api.get(`comments/station/${id}`),
    create:       (data)        => api.post("comments", data),
    remove:       (id)          => api.delete(`comments/${id}`),
};

// ─── Payments ────────────────────────────────────────────────────────────────
export const paymentsApi = {
    getByUser: (userId)         => api.get(`payments/user/${userId}`),
    create:    (data)           => api.post("payments", data),
    remove:    (id)             => api.delete(`payments/${id}`),
};
