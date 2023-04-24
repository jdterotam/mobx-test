import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { notification } from "antd";

export default function ResetPassword() {
  const [passwordDetails, setPasswordDetails] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = useCallback((_) => {
    if (!error) {
      updateUser({
        password: passwordDetails.password,
      });
      navigate("/login");
      notification.open({
        message: "Password has been reset successfully.",
      });
    }
  });

  const handleChange = (e) => {
    setPasswordDetails({
      ...passwordDetails,
      [e.target.name]: e.target.value,
    });
    setError(
      passwordDetails.password.length < 8
        ? "Please enter a strong password"
        : passwordDetails[e.target.name] !== passwordDetails.repeatPassword
        ? "Password does not match"
        : null
    );
  };

  return (
    <Row className="auth-wrapper">
      <Col sm={24} md={8} lg={8}>
        <h1>Reset Password</h1>
        <p>{error}</p>
        <Form>
          <Form.Item>
            <Input
              size="large"
              placeholder="Password"
              name="password"
              value={passwordDetails.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              placeholder="Repeat Password"
              name="repeatPassword"
              value={passwordDetails.repeatPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Button
            onClick={handleResetPassword}
            htmlType="submit"
            type="primary"
            disabled={
              error ||
              (!passwordDetails.password && !passwordDetails.repeatPassword)
            }
          >
            Reset Password
          </Button>

          <p>
            <NavLink to="/login">Back to login</NavLink>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
