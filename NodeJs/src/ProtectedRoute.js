import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    if (!keycloak.authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
