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
import its from '../../assets/its.png';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const { Header, Sider } = Layout;

const LayoutComponents = ({ onSearch }) => {
 
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
            style={{ color: 'black' }}
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

              <div className='col'>  
                {/* Image */}
                <div className='div-logo'>
                  <a href="/">
                    <img src={its} alt="its" className='logo-img' />
                  </a>
                </div>
              </div>

              <div className='col-6'>            
                {/* Searchbar */}
                <div className='div-form'>
                  <form onSubmit={handleSearch} className='div-form'>

                    <Autocomplete
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
                          name='searchBar'
                          label='Buscar'
                        />
                      )}
                    />

                    <Autocomplete
                      freeSolo
                      disableClearable
                      options={myOptions}
                      getOptionLabel={(option) => option}
                      value={selectedOption}
                      onChange={(event, newValue) => setSelectedOption(newValue)}
                      renderInput={(params) => (
                        <FormControl variant="outlined" sx={{ m: 1, width: '25ch' }}>
                          <InputLabel style={{ color: 'rgba(235, 235, 235, 0.5)' }}>Buscar</InputLabel>
                          <OutlinedInput
                            {...params}
                            endAdornment={
                              <InputAdornment position="end">
                                
                              </InputAdornment>
                            }
                            label="Buscar"
                          />
                        </FormControl>
                      )}
                    />

                    <Autocomplete
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
                          inputProps={{
                            ...params.inputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton variant='primary' type='button' onClick={handleSearch}>
                                  <SearchRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }}/>
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />

                  </form>
                </div>
              </div>                  

              <div className='col'>
                {/* Buttons */}
                <div className='div-buttons'>     
                  <Button variant="primary" type="submit" className='button'>
                    <ShoppingCartOutlinedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                  </Button>
                  <Button variant="primary" type="submit" className='button'>
                    <NotificationsRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                  </Button>
                  <Button variant="primary" type="submit" className='button' onClick={() => { window.location.href = '/detalleCuenta' }}>
                    <AccountCircleRoundedIcon  style={{ color: 'rgba(235, 235, 235, 0.5)' } } />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </Header>
      </Layout>
    </div>
  );
};

export default LayoutComponents;