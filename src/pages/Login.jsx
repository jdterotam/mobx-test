import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
        <Form requiredMark>
          <Form.Item rules={[{ required: true }]}>
            <Input
              size="large"
              placeholder="Email"
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Input.Password
              size="large"
              placeholder="Password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Button
            onClick={handleLogin}
            htmlType="submit"
            type="primary"
            disabled={
              Object.values(errors).some((value) => !!value) ||
              !Object.values(loginDetails).every((value) => !!value)
            }
          >
            Log In
          </Button>
          <Button htmlType="submit" type="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Form>
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
