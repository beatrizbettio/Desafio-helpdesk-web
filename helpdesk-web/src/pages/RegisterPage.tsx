import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { authService } from "../services/authService"

export function RegisterPage() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (!name.trim() || !email.trim() || !password) {
            setError("Preencha todos os campos")
            return
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres")
            return
        }

        if (password !== confirm) {
            setError("As senhas não conferem")
            return
        }

        try {
            setLoading(true)
            setError(null)

            await authService.register(name, email, password)

            await authService.login(email, password)

            navigate("/")

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado")
        } finally {
            setLoading(false)
        }
    }

    const inputClass =
        "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow"
            >
                <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>
                <p className="mb-6 mt-1 text-slate-600">Cadastre-se no HelpDesk Lite</p>

                <div className="mb-5">
                    <label htmlFor="name" className="mb-2 block font-medium text-slate-700">Nome</label>
                    <input id="name" type="text" value={name}
                        onChange={(e) => setName(e.target.value)} className={inputClass} />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="mb-2 block font-medium text-slate-700">E-mail</label>
                    <input id="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="mb-2 block font-medium text-slate-700">Senha</label>
                    <input id="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                </div>

                <div className="mb-5">
                    <label htmlFor="confirm" className="mb-2 block font-medium text-slate-700">Confirmar senha</label>
                    <input id="confirm" type="password" value={confirm}
                        onChange={(e) => setConfirm(e.target.value)} className={inputClass} />
                </div>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit" disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>

                <p className="mt-4 text-center text-slate-600">
                    Já tem conta?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Entrar
                    </Link>
                </p>
            </form>
        </div>
    )
}