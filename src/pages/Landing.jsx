import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { user } from "../store/User";

export default function Landing() {
  const navigate = useNavigate();
  useEffect((_) => {
    navigate(user.profile.email ? "/dashboard" : "/login");
  }, []);
}
