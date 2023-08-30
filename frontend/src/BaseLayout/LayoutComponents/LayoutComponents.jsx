import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InputGroup, Button } from 'react-bootstrap';
import { InputGroup, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LayoutComponents.css';
import itsv from '../../assets/itsv.png';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const { Header, Sider } = Layout;

const LayoutComponents = ({ onSearch }) => {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    getElement();
   
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  }



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
        <Menu theme="light" mode="inline" style={{ background: 'white' }}>
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
          <Menu.Item key="2" icon={<CachedRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/Prestamos' }}>
            Préstamo
          </Menu.Item>
          <Menu.Item key="3" icon={<PaidRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/presupuesto' }}>
            Presupuesto
          </Menu.Item>
          <Menu.Item key="4" icon={<DataUsageIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/informe' }}>
            Informe
          </Menu.Item>
          <Menu.Item key="5" icon={<AddModeratorRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = 'http://127.0.0.1:8000/admin' }}>
            Admin
          </Menu.Item>
          <Menu.Item key="7" icon={<AddModeratorRoundedIcon style={{ fontSize: '20px' }} />} onClick={downloadApp}>
            Descargar App
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="6" icon={<LogoutRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/logout' }}>
            Cerrar sesión
          </Menu.Item>

        </Menu>
      </Sider>

      
        <Header className='navbar'>
          <div className='div-logo'>
            <a href="/">
              <img src={its} alt="its" className='logo-img' />
            </a>
          </div>

          <div className='div-form'>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '10rem' }}>
              <div className='div-autocomplete'>
                <Autocomplete
                className='search-autocomplete'
                options={myOptions}
                getOptionLabel={(option) => option}
                value={selectedOption}
                onChange={(event, newValue) => setSelectedOption(newValue)}
                renderInput={(params) => (
                  <TextField
                  
                    name='searchBar'
                    {...params}
                    label="Buscar productos"
                    
                    
                    className='search-input'
                  />
                )}
              />
            </div>
              <Button className='button hover' variant="primary" type="submit" style={{ backgroundColor: '#2E5266', borderColor: '#2E5266', color: 'rgba(235, 235, 235, 0.5)' }}>
                <SearchRoundedIcon />
              </Button>
            </form>
          </div>

          <div className='div-buttons'>
           
            <Button variant="primary" type="submit" className='button hover'>
              <ShoppingCartOutlinedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
            </Button>
            <Button variant="primary" type="submit" className='button hover'>
              <NotificationsRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
            </Button>
            <Button variant="primary" type="submit" className='button hover' onClick={() => { window.location.href = '/detalleCuenta' }}>
              <AccountCircleRoundedIcon  style={{ color: 'rgba(235, 235, 235, 0.5)' } } />
            </Button>
          </div>
        </Header>
      
    </div>
  );
};

export default LayoutComponents;