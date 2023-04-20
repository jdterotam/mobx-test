import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import InputNumber from "antd/lib/input-number";

import { item } from "../store/Item";
import { categories } from "../constants/constants";
import TextArea from "antd/lib/input/TextArea";

const initialState = {
  name: "",
  description: "",
  category: null,
  price: null,
};

export default function AddItem() {
  const [itemDetails, setItemDetails] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState });
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    validateInput(e);
    setItemDetails({
      ...itemDetails,
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
      case "description":
        setErrors({
          ...errors,
          description:
            e.target.value === "" ? "Please enter a description" : "",
        });
        break;
      case "category":
        setErrors({
          ...errors,
          category: e.target.value === "" ? "Please enter a category" : "",
        });
        break;
      default:
        break;
    }
  });

  const handleAddItem = useCallback((_) => {
    // Don't proceed if there are any errors
    if (Object.values(errors).some((e) => !!e)) return;

    // Register the user
    const { addItem } = item;
    const newItem = addItem({ ...itemDetails });

    // Set server error if found one after register call
    setServerError(newItem.error ? newItem.error : null);

    // If not, navigate the newly registered user to do login
    !newItem.error && navigate("/items");
  });

  const handleReset = useCallback((_) => {
    setItemDetails(initialState);
    setErrors(initialState);
  });

  return (
    <Row className="auth-wrapper">
      <Col sm={24} md={8} lg={8}>
        <h1>Add Item</h1>
        <p>{serverError}</p>
        <Form requiredMark>
          <Form.Item
            rules={[{ required: true }]}
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
            <Input
              size="large"
              placeholder="Name"
              value={itemDetails.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            validateStatus={errors.description ? "error" : ""}
            help={errors.description}
          >
            <TextArea
              size="large"
              placeholder="Description"
              value={itemDetails.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            validateStatus={errors.category ? "error" : ""}
            help={errors.category}
          >
            <Select
              showSearch
              optionFilterProp="children"
              size="large"
              placeholder="Category"
              value={itemDetails.category}
              name="category"
              onChange={(val) => {
                handleChange({
                  target: {
                    name: "category",
                    value: val,
                  },
                });
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={null}
              options={categories}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            validateStatus={errors.price ? "error" : ""}
            help={errors.price}
          >
            <InputNumber
              size="large"
              placeholder="Price"
              value={itemDetails.price}
              name="price"
              onChange={(val) => {
                handleChange({
                  target: {
                    name: "price",
                    value: val,
                  },
                });
              }}
            />
          </Form.Item>
          <Button
            onClick={handleAddItem}
            htmlType="submit"
            type="primary"
            disabled={
              Object.values(errors).some((value) => !!value) ||
              !Object.values(itemDetails).every((value) => !!value)
            }
          >
            Add Item
          </Button>
          <Button htmlType="submit" type="secondary" onClick={handleReset}>
            Reset
          </Button>{" "}
        </Form>
        <p>
          <NavLink to="/items">Back to items </NavLink>
        </p>
      </Col>
    </Row>
  );
}
