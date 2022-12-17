import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, theme, Card, Button } from "antd";
import { Router } from "./Router";
import { BreadCrumbs } from "./components/breadCrumbs/breadCrumbs";
import { Link} from "react-router-dom";


const { Header, Content } = Layout;
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
      <Header className="header">
        <div style={{ display: 'flex', height: '64px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to='/'><h1 style={{ color: 'white' }}>Вебпрактик</h1></Link>
          <Link style={{ color: 'white' }} to='/login'><UserOutlined style={{fontSize:'20px'}}/> <Button ghost>Login/Register</Button></Link>
        </div>

      </Header>
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
            height: "100vh",
            marginTop: '10px',
            rowGap: '5px'
          
          }}
        >
        
          <BreadCrumbs />
          <Card style={{ width: 'fit-content', margin: '0 auto'}}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              
              }}
            >

              <Router />
            </Content>
          </Card>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
