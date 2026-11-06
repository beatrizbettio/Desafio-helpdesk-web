import { authService } from "./authService"

const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch(path: string, options: RequestInit = {}) {

    if (!authService.isAuthenticated()) {
        window.location.href = "/login"
        throw new Error("Sessão expirada")
    }

    const token = localStorage.getItem("access_token")

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers
        }
    })

    if (response.status === 401) {
        authService.logout()
        window.location.href = "/login"
        throw new Error("Sessão expirada")
    }

    return response
}