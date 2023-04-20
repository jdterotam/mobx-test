import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import LoginForm from "../components/Login/LoginForm";

import { user } from "../store/User";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginDetails, setLoginDetails] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  });

  const handleLogin = useCallback((_) => {
    if (Object.values(errors).some((e) => !!e)) return;
    const { login } = user;
    const userProfile = login({ ...loginDetails });

    userProfile.error &&
      setServerError(userProfile.error ? userProfile.error : "");

    !userProfile.error && navigate("/dashboard");
  });

  const handleReset = useCallback((_) => {
    setLoginDetails(initialState);
    setErrors(initialState);
  });

  return (
    <Row className="auth-wrapper">
      <Col sm={24} md={8} lg={8}>
        <h1>Login</h1>
        <p>{serverError}</p>
        <LoginForm
          handleChange={handleChange}
          handleLogin={handleLogin}
          handleReset={handleReset}
          loginDetails={loginDetails}
          errors={errors}
        />
        <p>
          <NavLink to="/forgot_password">Forgot Password?</NavLink>
        </p>
        <p>
          Not registered? <NavLink to="/register">Register</NavLink>
        </p>
      </Col>
    </Row>
  );
}
