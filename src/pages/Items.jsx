import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Layout from "antd/lib/layout";
import Row from "antd/lib/row";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";

import { item } from "../store/Item";
import { categories } from "../constants/constants";
import { Popconfirm } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, row) => <NavLink to={`/items/${row.id}`}>{name}</NavLink>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 400,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => categories.filter((c) => c.value === text)[0].label,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => `$${parseFloat(text).toFixed(2)}`,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) =>
      `${new Date(text).toLocaleDateString()},${new Date(
        text
      ).toLocaleTimeString()}`,
  },
  {
    title: "Action",
    render: (_, row) => {
      const confirm = (e) => {
        item.deleteItem(row.id);
      };
      const cancel = (e) => {
        console.log(e);
      };
      return (
        <>
          <NavLink
            title={`View ${row.name}`}
            style={{ marginRight: 20 }}
            to={`/items/${row.id}`}
          >
            <EyeOutlined />
          </NavLink>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Delete"
            cancelText="Cancel"
          >
            <a title={`Delete ${row.name}`}>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </>
      );
    },
  },
];

const tableRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
};

function Items() {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Row style={tableRowStyle}>
          <h1 style={{ marginBottom: 0 }}>Items</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={(_) => navigate("/items/add")}
          >
            Add Item
          </Button>
        </Row>
      </Layout>
      <Table rowKey={(r) => r.id} columns={columns} dataSource={item.items} />
    </>
  );
}

export default observer(Items);
