import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, theme, Card, Button } from "antd";
import { Router } from "./Router";
import { Head } from "./components/head/Head";

const { Header, Content, Footer } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Head />
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
            height: "100vh",
            marginTop: "10px",
            rowGap: "5px",
          }}
        >
          <Card style={{ width: "fit-content", margin: "0 auto" }} size="small">
            <Content
              style={{
                padding: 10,
                margin: 0,

                background: colorBgContainer,
              }}
            >
              <Router />
            </Content>
          </Card>
          <div>
            <p style={{ textAlign: "center" }}>Разработано командой Random()</p>
            <p style={{ textAlign: "center" }}>
              Если что-то не добавляется, после заполнения формы - перезагрузите
              страницу :(
            </p>
            <p style={{ textAlign: "center" }}>
              Если меняете аккаунт, перезагрузитесь на главной странице
            </p>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
