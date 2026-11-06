import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { authService } from "../services/authService"

export function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent){
        event.preventDefault()

        if(!email.trim() || !password.trim()){
            setError("Informe e-mail e senha")
            return
        }

        try{
            setLoading(true)
            setError(null)

            const token = await authService.login(email, password, admin)
            console.log("access_token:", token)

            navigate("/")
        }catch(e){
            setError(e instanceof Error ? e.message : "Erro inesperado")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow"
            >
                <h1 className="text-2x1 font-bold text-slate-900">HelpDesk Lite</h1>
                <p className="mb-6 mt-1 text-slate-600">Entre na sua conta</p>

                <div className="mb-5">
                    <label htmlFor="email" className="mb-2 block font-medium text-slate-700">
                        E-mail
                    </label>
                    <input
                        id="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="mb-2 block font-medium text-slate-700">
                        Senha
                    </label>
                    <input
                        id="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <label className="mb-5 flex items-center gap-2 text-slate-700">
                    <input
                        type="checkbox" checked={admin}
                        onChange={(e) => setAdmin(e.target.checked)}
                    />
                    Entrar como administrador
                </label>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit" disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                <p className="mt-4 text-center text-slate-600">
                    Não tem conta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
                
            </form>
        </div>
    )
}