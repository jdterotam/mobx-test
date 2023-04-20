import { NavLink, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";
import { observer } from "mobx-react-lite";

import EditItemModal from "../components/Items/EditItemModal";
import ItemDetailsDescription from "../components/ItemDetails/ItemDetailsDescription";

import { item } from "../store/Item";

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
      <ItemDetailsDescription itemDetails={itemDetails} />
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
