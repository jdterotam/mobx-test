import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import InputNumber from "antd/lib/input-number";
import TextArea from "antd/lib/input/TextArea";

import { categories } from "../../constants/constants";

function AddItemForm({
  errors,
  itemDetails,
  handleChange,
  handleReset,
  handleAddItem,
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
  );
}

export default AddItemForm;
