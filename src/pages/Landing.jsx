import { useNavigate } from "react-router-dom";

import { user } from "../store/User";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  useEffect((_) => {
    navigate(user.profile.email ? "/dashboard" : "/login");
  }, []);
}
