import Modal from "antd/lib/modal";
import { useCallback, useRef, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import InputNumber from "antd/lib/input-number";
import Button from "antd/lib/button";

import { categories } from "../../constants/constants";
import TextArea from "antd/lib/input/TextArea";

const initialState = {
  name: "",
  description: "",
  category: null,
  price: null,
};

export default function EditItemModal({
  handleModalView,
  modalOpen,
  itemDetails: item,
  updateItem,
}) {
  const [itemDetails, setItemDetails] = useState({ ...item });
  const [errors, setErrors] = useState({ ...initialState });
  const title = useRef(itemDetails.name);

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

  const handleEditItem = useCallback((_) => {
    if (Object.values(errors).some((e) => !!e)) return;
    updateItem({ ...itemDetails });
    handleModalView(false);
  });

  const handleReset = useCallback((_) => {
    setItemDetails(initialState);
    setErrors(initialState);
  });
  return (
    <Modal
      title={null}
      centered
      footer={null}
      open={modalOpen}
      onOk={() => handleModalView(false)}
      onCancel={() => handleModalView(false)}
    >
      <h2 style={{ marginBottom: 20 }}>Edit {title.current}</h2>
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
            rows={10}
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
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
          onClick={handleEditItem}
          htmlType="submit"
          type="primary"
          disabled={
            Object.values(errors).some((value) => !!value) ||
            !Object.values(itemDetails).every((value) => !!value)
          }
        >
          Edit Item
        </Button>
        <Button htmlType="submit" type="secondary" onClick={handleReset}>
          Reset
        </Button>{" "}
      </Form>
    </Modal>
  );
}
