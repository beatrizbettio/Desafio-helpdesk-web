const API_URL = import.meta.env.VITE_API_URL

export async function login(
    email: string,
    password: string,
    admin = false
): Promise<string> {
    const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            admin ? {email, password, admin: true} : {email, password}
        )
    })

    if (!response.ok){
        throw new Error(
            response.status === 403
                ? "E-mail ou senha inválidos"
                : `Erro ao fazer login ${response.status}`
        )
    }

    const data = await response.json()

    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("is_admin", String(admin))
    return data.access_token
}

export function logout(){
    localStorage.removeItem("access_token")
    localStorage.removeItem("is_admin")
}

export function isAdmin() {
    return localStorage.getItem("is_admin") === "true"
}

function tokenExpired(token: string): boolean {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        const payload = JSON.parse(atob(base64))
        return payload.exp ? payload.exp * 1000 < Date.now() : false
    } catch {
        return true
    }
}

export function isAuthenticated() {
    const token = localStorage.getItem("access_token")
    if (!token) return false

    if (tokenExpired(token)) {
        localStorage.removeItem("access_token")
        return false
    }
    return true
}

export async function register(name: string, email: string, password: string) {

    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "usuario" })
    })

    if (!response.ok) {
        throw new Error(`Erro ao cadastrar: ${response.status}`)
    }

    return await response.json()
}

export const authService = { login, logout, isAuthenticated, register, isAdmin }