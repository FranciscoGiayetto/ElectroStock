import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './LayoutComponents.css';
import its from '../../assets/its.png';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const { Header, Sider } = Layout;
const LayoutComponents = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]); // Estado para almacenar los datos obtenidos del fetch
  const [filteredOptions, setFilteredOptions] = useState([]); // Estado para almacenar las opciones filtradas del autocompletado
  const [selectedOption, setSelectedOption] = useState(null); // Estado para almacenar el valor seleccionado del autocompletado

  const [myOptions, setMyOptions] = useState([])

  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsEcommerce/`);
    let data = await response.json();
    setData(data);
    for (var i = 0; i < data.length; i++) {
      myOptions.push(data[i].name)
    }
    setMyOptions(myOptions)
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchBar.value;
    const filteredOptions = data.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };
  

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
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
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.2)', // Aplica sombra a la sidebar
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
            style={{ color: 'black', alignItems: 'center' }}
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
    padding: 0,
    background: '#2E5266',
    position: 'fixed',
    right: 0,
    left: 0,
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Aplica sombra a la navbar
  }}
>
  <a href="/" style={{ marginRight: 'auto' }}>
    <img src={its} alt="its" style={{ width: '100px' }} />
  </a>

  <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
  <Autocomplete
  options={myOptions}
  getOptionLabel={(option) => option}
  value={selectedOption}
  onChange={(event, newValue) => setSelectedOption(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Buscar productos"
      variant="outlined"
      fullWidth
    />
  )}
/>

      <Button variant="primary" type="submit" style={{ backgroundColor: '#2E5266', borderColor: '#2E5266' }}>
        <SearchRoundedIcon />
      </Button>
    
  </form>
</Header>


      </Layout>
    </div>
  );
};

export default LayoutComponents;
