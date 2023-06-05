import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { UploadOutlined } from '@ant-design/icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './Sidebar.css';

const { Header, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchBar.value;
    // Handle search logic here
    console.log('Search query:', searchQuery);
  };

  return (
    <div>
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
            {
              key: '0',
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              onClick: handleToggleSidebar,
              style: { color: '#EBEBEB' },
              alignItems: 'center',
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
          <form onSubmit={handleSearch}>
            <InputGroup>
              <FormControl
                type="text"
                name="searchBar"
                placeholder="Buscar productos"
                style={{
                  backgroundColor: '#203d4d',
                  borderColor: '#2E5266',
                  borderRadius: '20px',
                }}
              />
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: '#2E5266', borderColor: '#2E5266' }}
              >
                <SearchRoundedIcon />
              </Button>
            </InputGroup>
          </form>
        </Header>
      </Layout>
    </div>
  );
};

export default App;
