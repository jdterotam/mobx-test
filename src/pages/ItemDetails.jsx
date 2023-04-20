import { NavLink, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import Descriptions from "antd/lib/descriptions";
import EditOutlined from "@ant-design/icons/EditOutlined";

import EditItemModal from "../components/Items/EditItemModal";

import { item } from "../store/Item";
import { user } from "../store/User";
import { observer } from "mobx-react-lite";
import { categories } from "../constants/constants";

function ItemDetails() {
  const { id } = useParams();
  const [modalOpen, handleModalOpen] = useState(false);
  const itemDetails = item.items.filter((i) => i.id === id)[0];
  const { user: userCreated, rating, ...newItem } = itemDetails;

  // Handle Modal View
  const handleModalView = useCallback((status) => {
    handleModalOpen(status);
  });

  // Edit Item Details
  const handleEdit = useCallback((_) => {
    handleModalOpen(true);
  });

  return (
    <>
      <NavLink to="/items">Back to listing</NavLink>
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
      <a onClick={handleEdit}>
        <EditOutlined /> Edit
      </a>

      <EditItemModal
        modalOpen={modalOpen}
        updateItem={item.updateItem}
        handleModalView={handleModalView}
        itemDetails={newItem}
      />
    </>
  );
}

export default observer(ItemDetails);
