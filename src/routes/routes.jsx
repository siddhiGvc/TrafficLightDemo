import {Route, Routes,Outlet} from "react-router-dom"
import App from "../App"
import LoginView from "../Pages/login/login"
import Navbar from "../components/navbar/navbar"
import Sidebar from "../components/sidebar/sidebar"

export default function AllRouter(){

    return (
        <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="/login" element={<LoginView />} />
      </Routes>
    )

}
