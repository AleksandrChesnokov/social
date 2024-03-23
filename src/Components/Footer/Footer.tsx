import React from "react";
import { Layout } from "antd";

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  backgroundColor: "#dce1e6",
};

export const Footer = () => {
  return <Layout.Footer style={footerStyle}>Footer</Layout.Footer>;
};
