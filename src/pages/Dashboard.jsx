import { user } from "../store/User";

export default function Dashboard() {
  return <h1>Total Users: {user.users.length}</h1>;
}
