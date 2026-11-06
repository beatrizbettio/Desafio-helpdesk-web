import {Route, Routes} from "react-router"
import { AppLayout } from "./layouts/AppLayout"
import { RequireAuth } from "./components/RequireAuth"

import { RegisterPage } from "./pages/RegisterPage"
import { LoginPage } from "./pages/LoginPage"
import { TicketPage } from "./pages/TicketPage"
import { HomePage } from "./pages/HomePage"
import { NewTicketPage } from "./pages/NewTicketPage"
import { TicketDetailsPage } from "./pages/TicketDetailsPage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {

  return(   
    <Routes>

      <Route path="register" element={<RegisterPage />} />

      <Route path="login" element={<LoginPage />} />

      <Route element={<RequireAuth />} >

        <Route element = {<AppLayout />} >

          <Route
            index
            element={<HomePage />}
          />

          <Route 
            path="chamados"
            element={<TicketPage />}
          />

          <Route 
            path="chamado/novo"
            element={<NewTicketPage />}
          />

          <Route
            path="chamado/:id"
            element={<TicketDetailsPage />}
          />

          <Route 
            path="*"
            element={<NotFoundPage />}
          />
          
        </Route>
      
      </Route>

    </Routes>
  )
  
}

export default App
