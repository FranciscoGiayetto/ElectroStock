import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Breadcrumb, Layout, Menu, theme } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Header: { Group } } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'fixed',
          left: 0,
          height: '100vh',
          background: '#2E5266', 
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ marginTop: 64, background: '#2E5266' }}
          items={[
          { key: '0',
            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
            label: 'Menú',
            onClick: handleToggleSidebar,
            style: { width: 64, height: 64, color: 'white' },
          },
          { key: '1', icon: <AddModeratorRoundedIcon />, label: 'Admin' },
          { key: '2', icon: <StorageRoundedIcon />, label: 'Stock' },
          { key: '3', icon: <PaidRoundedIcon />, label: 'Presupuesto' },
          { key: '4', icon: <UploadOutlined />, label: 'Préstamo' },
          { key: '5', icon: <StoreRoundedIcon />, label: 'Tienda' },
          { key: '6', icon: <LogoutRoundedIcon />, label: 'Cerrar sesión' },
  ]}
/>

      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            background: '#2E5266',
            position: 'fixed',
            right: 0,
            left: collapsed ? 80 : 200,
            zIndex: 1,
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            
          />
          
        </Header>
        
      </Layout>
    </Layout>
  );
};

export default App;