import { Routes, Route } from "react-router-dom"
import AdminRoutes from "../admin/routes"
import UserRoutes from "../user/routes"
import UserLogin from "../user/pages/auth/Login"
import AuthLayout from "../layouts/AuthLayout"
import Register from "../user/pages/auth/Register"
import AdminLogin from "../admin/pages/AdminLogin"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
       <Route element={<AuthLayout/>}>
               <Route path="/login" element={<UserLogin/>} />
               <Route path="/register" element={<Register/>} />
             </Route>
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Apps */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  )
}

export default AppRoutes
