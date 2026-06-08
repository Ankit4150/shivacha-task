import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ children, role }) {
  const { userDetails, loading } =
    useContext(UserContext);

  // Wait until user data is loaded
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!userDetails) {
    return <Navigate to="/" replace />;
  }

  if (
    role &&
    userDetails.role?.toUpperCase() !== role.toUpperCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;