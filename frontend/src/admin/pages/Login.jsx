import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { useGetMeQuery, useLazyGetMeQuery, useLoginMutation } from "../../services/auth/authApi"
import Input from "../../shared/Input/Input"
import Button from "../../shared/Button/Button"
import { useDispatch } from "react-redux"
import { setUser } from "../../services/auth/authSlice"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading, error }] = useLoginMutation()
  const [getMe, { isLoading: meLoading }] = useLazyGetMeQuery()
  const navigate = useNavigate()

  const dispatch = useDispatch()

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
     await login({ email, password }).unwrap()   // ✅ login success
    const meRes = await getMe().unwrap()        // ✅ calls auth/profile/
    dispatch(setUser(meRes.user))  // 🔥 THIS WAS MISSING
    // 🔥 redirect AFTER auth state updated
    navigate("/admin/dashboard", { replace: true })

  } catch (err) {
    console.error(err)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
          error={error ? "Invalid credentials" : ""}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default AdminLogin
