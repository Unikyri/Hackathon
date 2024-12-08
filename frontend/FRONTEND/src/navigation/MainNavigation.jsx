import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "../pages/home/Home";
import UserAdmin from "../pages/home/UserAdmin";
import PageNotFound from "../pages/other/PageNotFound";
import FavouritesSeller from "../pages/favourites/FavouritesSeller";
import { Comprador, Vendedor, UserProfile } from "../pages/index";
import { AuthContext } from "../providers/AuthProvider";

export default function MainNavigation() {
    const { userRole} = useContext(AuthContext);

    // Función para renderizar el componente basado en el rol
    const renderRoleBasedComponent = () => {
        if (userRole === "comprador") {
            return <Comprador />;
        } else if (userRole === "vendedor") {
            return <Vendedor />;
        } else {
            // Redirigir a una página no autorizada si el rol no es válido
            return <Navigate to="/not-authorized" />;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/favoritos" element={<FavouritesSeller />} />
                {/* Ruta dinámica para renderizar basado en el rol */}
                <Route path="/perfil" element={renderRoleBasedComponent()} />
                <Route path="/profile/:name" element={<UserProfile />} />
                <Route path="/admin" element={<UserAdmin />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
