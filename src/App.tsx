import { Routes, Route, Navigate, Outlet } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import AppLayout from "./layouts/AppLayout"
import Home from "./views/home/Home"
import Settings from "./views/home/Settings"
import useStore from "./context/useStore"


const PrivateRoutes = () => {
  const [authenticated] = useStore<string>('auth');

  if (authenticated !== 'authenticated') return <Navigate to={'/auth/login'} replace />

  return <Outlet />
}
function App() {

  return (
    <Routes>


      <Route element={<AuthLayout />} path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />} path="/">
          <Route path="/" element={<Home />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
      </Route>




    </Routes>

  )
}

export default App
