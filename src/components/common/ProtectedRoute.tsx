import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useSelector((state: RootState) => state.client.user);
    const isAuthChecked = useSelector((state: RootState) => state.client.isAuthChecked);

    if (!isAuthChecked) {
        return null; // kontrol bitene kadar bekle, erken yönlendirme yapma
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;