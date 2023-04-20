import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

export default function LoginForm({
  loginDetails,
  handleChange,
  errors,
  handleLogin,
  handleReset,
}) {
  return (
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
  );
}
