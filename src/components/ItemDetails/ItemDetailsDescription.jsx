import Descriptions from "antd/lib/descriptions";

import { user } from "../../store/User";
import { categories } from "../../constants/constants";

export default function ItemDetailsDescription({ itemDetails }) {
  return (
    <>
      <Descriptions
        bordered
        layout="vertical"
        column={3}
        style={{ margin: "2em 0" }}
        title={itemDetails.name}
      >
        <Descriptions.Item label="Description">
          <p>{itemDetails.description}</p>
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          ${parseFloat(itemDetails.price).toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {categories.filter((c) => c.value === itemDetails.category)[0].label}
        </Descriptions.Item>
        <Descriptions.Item label="Created On">
          {`${new Date(itemDetails.createdAt).toLocaleDateString()}, ${new Date(
            itemDetails.createdAt
          ).toLocaleTimeString()}`}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          {user.users.filter((u) => u.id === itemDetails.user)[0].name}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
