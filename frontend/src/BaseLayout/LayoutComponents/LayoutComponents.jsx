import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import './LayoutComponents.css';
import its from '../../assets/its.png';


const { Header, Sider } = Layout;
const LayoutComponents = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchBar.value;
    console.log('Search query:', searchQuery);
  };

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100vh',
          background: '#EBEBEB',
          position: 'fixed',
          left: 0,
          top: 64,
          zIndex: 10,
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: '#EBEBEB' }}
        >
          <Menu.Item
            key="0"
            icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : <MenuFoldOutlined style={{ fontSize: '20px' }} />}
            onClick={handleToggleSidebar}
            style={{ color: 'black'}}
          />
          <Menu.Divider />
          <Menu.Item key="1" icon={<StoreRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/tienda' }}>
            Tienda
          </Menu.Item>
          <Menu.Item key="2" icon={<CachedRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/prestamo' }}>
            Préstamo
          </Menu.Item>
          <Menu.Item key="3" icon={<PaidRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/presupuesto' }}>
            Presupuesto
          </Menu.Item>
          <Menu.Item key="4" icon={<StorageRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/stock' }}>
            Stock
          </Menu.Item>
          <Menu.Item key="5" icon={<AddModeratorRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = 'http://127.0.0.1:8000/admin' }}>
            Admin
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="6" icon={<LogoutRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/logout' }}>
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin:0,
            padding: 0,
            background: '#2E5266',
            position: 'fixed',
            right: 0,
            left: 0,
            zIndex: 1,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
        
        <a href="/" >
          <img src={its} alt="its" style={{ width: '100px' }} />
        </a>          
                      
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl
                type="text"
                name="searchBar"
                placeholder="Buscar productos..."
                className='search-input'
                style={{
                  backgroundColor: '#2E5266',
                  borderColor: 'rgba(235, 235, 235, 0.5)',
                  borderRadius: '20px',
                  marginRight: 'auto',
                  marginLeft: '10px',
                  flex: 1,
                  maxWidth: '400px',
                }}
              />
          </form>
          
          <Button variant="primary" type="submit" className='button hover' >
            <SearchRoundedIcon style={{color: 'rgba(235, 235, 235, 0.5)'}}/>
          </Button>
          <Button variant="primary" type="submit" className='button hover'>
            <ShoppingCartOutlinedIcon style={{color: 'rgba(235, 235, 235, 0.5)'}}/>
          </Button>
          <Button variant="primary" type="submit" className='button hover'>
            <NotificationsRoundedIcon style={{color: 'rgba(235, 235, 235, 0.5)'}}/>
          </Button>
          <Button variant="primary" type="submit" className='button hover'>
            <AccountCircleRoundedIcon style={{color: 'rgba(235, 235, 235, 0.5)'}}/>
          </Button>
        </Header>
      </Layout>

    </div>
  );
};

export default LayoutComponents;
