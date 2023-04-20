import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Col from "antd/lib/col";
import Row from "antd/lib/row";

import { user } from "../store/User";
import RegisterForm from "../components/Register/RegisterForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  phone: "",
};

export default function Register() {
  const [registerDetails, setRegisterDetails] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState });
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    validateInput(e);
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  });

  const validateInput = useCallback((e) => {
    switch (e.target.name) {
      case "name":
        setErrors({
          ...errors,
          name: e.target.value === "" ? "Please enter a name" : "",
        });
        break;

      case "email":
        setErrors({
          ...errors,
          email:
            e.target.value === ""
              ? "Please enter an email"
              : !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/.test(e.target.value)
              ? "Please enter a valid email"
              : "",
        });
        break;

      case "phone":
        setErrors({
          ...errors,
          phone: e.target.value === "" ? "Please enter a phone number" : "",
        });
        break;

      case "password":
        setErrors({
          ...errors,
          password:
            e.target.value === ""
              ? "Please enter a password"
              : e.target.value.length > 10
              ? "Please enter a strong password"
              : "",
        });
        break;

      case "repeatPassword":
        setErrors({
          ...errors,
          repeatPassword:
            e.target.value !== registerDetails.password
              ? "Passwords do not match"
              : "",
        });
        break;
      default:
        break;
    }
  });

  const handleRegister = useCallback((_) => {
    // Don't proceed if there are any errors
    if (Object.values(errors).some((e) => !!e)) return;

    // Register the user
    const { register } = user;
    delete registerDetails["repeatPassword"];
    const userProfile = register({ ...registerDetails });

    // Set server error if found one after register call
    setServerError(userProfile.error ? userProfile.error : null);

    // If not, navigate the newly registered user to do login
    !userProfile.error && navigate("/login");
  });

  const handleReset = useCallback((_) => {
    setRegisterDetails(initialState);
    setErrors(initialState);
  });

  return (
    <Row className="auth-wrapper">
      <Col sm={24} md={8} lg={8}>
        <h1>Register</h1>
        <p>{serverError}</p>
        <RegisterForm
          handleChange={handleChange}
          handleRegister={handleRegister}
          handleReset={handleReset}
          registerDetails={registerDetails}
          errors={errors}
        />
        <p>
          Already registered? <NavLink to="/login">Login</NavLink>
        </p>
      </Col>
    </Row>
  );
}
