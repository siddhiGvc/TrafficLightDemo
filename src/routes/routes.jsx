import {Route, Routes,Outlet} from "react-router-dom"
import App from "../App"
import LoginView from "../Pages/login/login"
import Sidebar from "../components/sidebar/sidebar"
import Users from "../Pages/users/user"

export default function AllRouter(){

    return (
        <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<App />} />
          <Route path="/user" element={<Users/>} />
        </Route>
        <Route path="/login" element={<LoginView />} />
      </Routes>
    )

}
