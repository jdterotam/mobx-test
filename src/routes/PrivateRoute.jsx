import { Navigate } from "react-router-dom";
import { user } from "../store/User";

export default function PrivateRoute({ children }) {
  return user.profile.email ? children : <Navigate to="/login" />;
}
