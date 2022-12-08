import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <Outlet/> : <Navigate to={"/"}/>
}

export default PrivateRoutes;