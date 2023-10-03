import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {

    const userInfo = useContext(AuthContext)
    const { user, loading } = userInfo

    if (loading) {
        return <div className="text-center">
            <span className="loading loading-spinner text-success w-12"></span>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login"></Navigate>
};

export default PrivateRoutes;