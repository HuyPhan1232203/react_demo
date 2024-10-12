import { Badge, Layout, Menu } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const { Header } = Layout;
  const nav = useNavigate();
  const cart = useSelector((store) => store.cart);

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        className="logo"
        style={{
          color: "#fff",
          float: "left",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        MyApp
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            nav("cart");
          }}
        >
          <Badge count={cart.length}>
            <ShoppingCartOutlined style={{ fontSize: 20, color: "#fff" }} />
          </Badge>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Header;
