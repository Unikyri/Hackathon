import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import UserAdmin from "../pages/home/UserAdmin";
import PageNotFound from "../pages/other/PageNotFound";
import FavouritesSeller from "../pages/favourites/FavouritesSeller";
import {Comprador, UserProfile} from "../pages/index";

// import {Vendedor, comprador} from '../pages';
export default function MainNavigation() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>}/>   
                <Route path="/favoritos" element={<FavouritesSeller />} />
                <Route path="/perfil" element={<Comprador/>} />
                <Route path="/profile/:name" element={<UserProfile />} />
                <Route path="/admin" element={<UserAdmin />} />
                {/* <Route path="/perfil" element={<Vendedor />} /> */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}