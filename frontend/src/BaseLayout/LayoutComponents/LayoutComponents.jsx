import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InputGroup, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './LayoutComponents.css';
import itsv from '../../assets/itsv.png';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const { Header, Sider } = Layout;

const LayoutComponents = ({ onSearch }) => {
 
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsEcommerce/`);
    let data = await response.json();
    let uniqueOptions = new Set();

    for (var i = 0; i < data.length; i++) {
      uniqueOptions.add(data[i].name);
    }

    let optionsArray = Array.from(uniqueOptions);

    setData(data);
    setMyOptions(optionsArray);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchBar.value;
    onSearch(searchQuery);
    navigate(`/tienda?searchQuery=${searchQuery}`);
   // console.log(searchQuery)  
  };

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar'>
        <Menu theme="light" mode="inline" style={{ background: '#EBEBEB' }}>
          <Menu.Item
            key="0"
            icon={collapsed ? <MenuIcon style={{ fontSize: '20px' }} /> : <ArrowBackIosIcon style={{ fontSize: '17px' }} />}
            onClick={handleToggleSidebar}
            className={collapsed ? 'menu-icon-collapsed' : 'menu-icon-expanded'}
            style={{ color: 'black',
                     backgroundColor:'transparent' }}
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
        <Header className='navbar'>
          <div className='container' style={{maxWidth: '100%'}}>
            <div className='row' style={{width: '100%'}}>
              
              {/* Image */}
              <div className='col centered-column'>  
                <a href="/">
                  <img src={itsv} alt="itsv" className='logo-img' />
                </a>              
              </div>
              
              {/* Searchbar */}
              <div className='col-6 centered-column'>            
                <form onSubmit={handleSearch} className='div-form'>

                  <Autocomplete
                    className='search-input'
                    freeSolo
                    disableClearable
                    options={myOptions}
                    getOptionLabel={(option) => option}
                    value={selectedOption}
                    onChange={(event, newValue) => setSelectedOption(newValue)}
                    renderInput={(params) => (
                      <TextField
                        className='search-input'
                        {...params}
                        variant="outlined"
                        name='searchBar'
                        label="Buscar productos"
                        InputLabelProps={{
                          style: { color: 'rgba(235, 235, 235, 0.5)'}  
                        }}
                      />
                    )}
                  />

                  <Button className='button hover' variant="primary" type="submit" style={{ backgroundColor: '#2E5266', borderColor: '#2E5266', color: 'rgba(235, 235, 235, 0.5)' }}>
                    <SearchRoundedIcon />
                  </Button>

                </form> 
              </div>                  

              {/* Buttons */}
              <div className='col centered-column'>
                     
                  <Button variant="primary" type="submit" className='button' style={{ margin: '0 10px' }}>
                    <ShoppingCartOutlinedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                  </Button>
                  <Button variant="primary" type="submit" className='button' style={{ margin: '0 10px' }}>
                    <NotificationsRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                  </Button>
                  <Button variant="primary" type="submit" className='button' style={{ margin: '0 10px' }} onClick={() => { window.location.href = '/detalleCuenta' }}>
                    <AccountCircleRoundedIcon  style={{ color: 'rgba(235, 235, 235, 0.5)' } } />
                  </Button>
                
              </div>

            </div>
          </div>
        </Header>
      </Layout>
    </div>
  );
};

export default LayoutComponents;