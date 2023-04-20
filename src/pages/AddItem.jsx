import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Col from "antd/lib/col";
import Row from "antd/lib/row";

import { item } from "../store/Item";
import AddItemForm from "../components/Items/AddItemForm";

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
        <AddItemForm
          handleChange={handleChange}
          handleAddItem={handleAddItem}
          handleReset={handleReset}
          itemDetails={itemDetails}
          errors={errors}
        />
        <p>
          <NavLink to="/items">Back to items </NavLink>
        </p>
      </Col>
    </Row>
  );
}
