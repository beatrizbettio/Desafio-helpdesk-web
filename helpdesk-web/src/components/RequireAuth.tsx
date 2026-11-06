import { Navigate, Outlet } from "react-router"
import { authService } from "../services/authService"

export function RequireAuth(){
    if(!authService.isAuthenticated()){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}