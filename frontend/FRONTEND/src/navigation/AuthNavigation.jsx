import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/RegisterPage";
import Home from "../pages/home/Home";
import DeniedPage from "../pages/other/Denied";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Externo from "../pages/externo/Externo"
import Test from "../pages/test/Test";
import FavouritesSeller from "../pages/favourites/FavouritesSeller";
import UserProfile from "../pages/perfil/UserProfile";

export default function AuthNavigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<DeniedPage />} />
                <Route path="/favoritos" element={<FavouritesSeller />} />
                <Route path="/profile/:name" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}