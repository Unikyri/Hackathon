import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/RegisterPage";
import DeniedPage from "../pages/other/Denied";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Externo from "../pages/externo/Externo"
import Test from "../pages/test/Test"

export default function AuthNavigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="*" element={<DeniedPage />} />
            </Routes>
        </BrowserRouter>
    );
}