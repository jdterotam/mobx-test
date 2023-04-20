import { user } from "../store/User";

export default function PublicRoute({ children }) {
  return user.profile.token ? <Navigate to="/dashboard" /> : children;
}
