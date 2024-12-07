import { useContext , useEffect  } from "react";
import { AuthContext } from "../providers/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

const LoadingScreen = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
    );
};

const ContainerNavigation = () => {

    const { token, isLoading , session ,setSession } = useContext(AuthContext);

    useEffect(() => {
        console.log(`session a cambiado y tendra que reiniciar el componente : session=${session}, userRole=${token}`);
      }, [session])


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (session == 'true') ? <MainNavigation/> : <AuthNavigation />;

};

export default ContainerNavigation;
