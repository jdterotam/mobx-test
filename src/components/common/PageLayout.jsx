import { Layout, Menu, Button } from "antd";
import { BuildOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;

import { user } from "../../store/User";
import { useCallback } from "react";

const headerStyle = {
  color: "black",
  borderBottom: "1px solid lightgray",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  width: "100vw",
  flex: 1,
};
const menuStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
};
const contentWrapperStyle = {
  height: "calc(100vh - 130px)",
};
const contentStyle = {
  padding: "30px",
};
const footerStyle = {
  borderTop: "1px solid lightgray",
  textAlign: "center",
  color: "gray",
};

export default function PageLayout({ children }) {
  const { logout } = user;
  const navigate = useNavigate();

  const handleLogout = useCallback((_) => {
    logout();
    navigate("/login");
  });
  return (
    <Layout>
      <Header style={headerStyle}>
        <BuildOutlined style={{ fontSize: 40 }} />

        <Menu
          style={menuStyle}
          mode="horizontal"
          items={[
            {
              label: <NavLink to="/dashboard">Dashboard</NavLink>,
              key: 0,
            },
            {
              label: <NavLink to="/items">Items</NavLink>,
              key: 1,
            },
          ]}
        />
        <Button size="default" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Layout style={contentWrapperStyle}>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <Footer style={footerStyle}>
        <span>&copy; All rights reserved. {new Date().getFullYear()}.</span>
      </Footer>
    </Layout>
  );
}
