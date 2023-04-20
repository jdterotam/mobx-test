import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = useCallback((_) => {
    console.log("Handle Forgot Password");
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(
      !e.target.value
        ? "Please enter an email"
        : !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/.test(e.target.value)
        ? "Please enter a valid email"
        : ""
    );
  };

  return (
    <Row className="auth-wrapper">
      <Col sm={24} md={8} lg={8}>
        <h1>Forgot Password?</h1>
        <Form>
          <Form.Item
            rules={[{ required: true }]}
            validateStatus={error ? "error" : ""}
            help={error}
          >
            <Input
              size="large"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Item>
          <Button
            onClick={handleForgotPassword}
            htmlType="submit"
            type="primary"
            disabled={error || !email}
          >
            Send password reset email
          </Button>

          <p>
            <NavLink to="/login">Back to login</NavLink>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
