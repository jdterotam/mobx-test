import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Button from "antd/lib/button";

export default function RegisterForm({
  registerDetails,
  errors,
  handleChange,
  handleRegister,
  handleReset,
}) {
  return (
    <Form requiredMark>
      <Form.Item
        rules={[{ required: true }]}
        validateStatus={errors.name ? "error" : ""}
        help={errors.name}
      >
        <Input
          size="large"
          placeholder="Name"
          value={registerDetails.name}
          name="name"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        validateStatus={errors.email ? "error" : ""}
        help={errors.email}
      >
        <Input
          size="large"
          placeholder="Email"
          value={registerDetails.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        validateStatus={errors.phone ? "error" : ""}
        help={errors.phone}
      >
        <Input
          size="large"
          placeholder="Phone"
          value={registerDetails.phone}
          name="phone"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        validateStatus={errors.password ? "error" : ""}
        help={errors.password}
      >
        <Input.Password
          size="large"
          placeholder="Password"
          value={registerDetails.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        validateStatus={errors.repeatPassword ? "error" : ""}
        help={errors.repeatPassword}
      >
        <Input.Password
          size="large"
          placeholder="Repeat Password"
          value={registerDetails.repeatPassword}
          name="repeatPassword"
          onChange={handleChange}
        />
      </Form.Item>
      <Button
        onClick={handleRegister}
        htmlType="submit"
        type="primary"
        disabled={
          Object.values(errors).some((value) => !!value) ||
          !Object.values(registerDetails).every((value) => !!value)
        }
      >
        Register
      </Button>
      <Button htmlType="submit" type="secondary" onClick={handleReset}>
        Reset
      </Button>{" "}
    </Form>
  );
}
