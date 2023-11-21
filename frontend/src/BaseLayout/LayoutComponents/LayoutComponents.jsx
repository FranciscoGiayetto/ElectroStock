import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AddModeratorRoundedIcon from '@mui/icons-material/AddModeratorRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { Badge } from 'antd';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { InputGroup, Button } from 'react-bootstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DataUsageRoundedIcon from '@mui/icons-material/DataUsageRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Tooltip from '@mui/material/Tooltip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LayoutComponents.css';
import itsv from '../../assets/itsv.png';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import useAxios from "../../utils/useAxios";
import { useAuthStore } from '../../store/auth';
import { cartEventEmitter } from '../../pages/DetalleProducto/DetalleProducto';

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

const { Header, Sider } = Layout;

const LayoutComponents = ({ onSearch, isProfessor }) => {
  const api = useAxios();
  
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [myOptions, setMyOptions] = useState([]);
  const [cantCarrito, setCantCarrito] = useState(0);
  const [cantNotificaciones, setCantNotificaciones] = useState(0);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const userData = user();

  useEffect(() => {
    getElement();
    getCantCarrito();
    getCantNotificaciones();
  }, []);

 
  useEffect(() => {
    // Suscríbete al evento del carrito para actualizar la cantidad del carrito
    const updateCart = () => {
      getCantCarrito();
    };

    cartEventEmitter.on('updateCart', updateCart);

    // Limpia la suscripción cuando se desmonta el componente
    return () => {
      cartEventEmitter.off('updateCart', updateCart);
    };
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
  // Hide the install button.
  setIsReadyForInstall(false);
}
const isSmallScreen = useMediaQuery('(max-width: 1100px)');



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

  const getCantCarrito = async () => {
    try {
      const response = await api.get(`/cantCarrito/${userData.user_id}/`);
      let data = await response.data;
      console.log(data)
      setCantCarrito(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCantNotificaciones = async () => {
    try {
      const response = await api.get(`/cantNotificaciones/${userData.user_id}/`);
      const data = await response.data;
      setCantNotificaciones(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{fontFamily: 'Roboto, sans-serif'}}>
      {/* SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        className='sidebar'
      >

        {!collapsed && (
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
    
          {isProfessor && (
              <Menu.Item key="3" icon={<PaidRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/presupuesto' }}>
                Presupuesto
              </Menu.Item>
            )}
            {isProfessor && (
              <Menu.Item key="4" icon={<DataUsageRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/informe' }}>
                Informe
              </Menu.Item>
            )}
            {isProfessor && (
            <Menu.Item key="5" icon={<AddModeratorRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = 'http://127.0.0.1:8000/admin' }}>
              Admin
            </Menu.Item>
               )}
          <Menu.Divider />
     
          
          <Menu.Item key="7" icon={<DownloadRoundedIcon style={{ fontSize: '20px' }} />} onClick={downloadApp}>
            Descargar App
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutRoundedIcon style={{ fontSize: '20px' }} />} onClick={() => { window.location.href = '/logout' }}>
            Cerrar sesión
          </Menu.Item>
        </Menu>
        )}
      </Sider>

      {/* NAVBAR */}
      <Header className='navbar'>
          <Container fluid>
            <Row>
            <Col>
              <Button
                variant="primary"
                type="submit"
                className='button'
                onClick={handleToggleSidebar}
              >
                <MenuRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
              </Button>
            </Col>

           
          
              {/* Image */}
              <Col style={{ marginLeft:'1.5rem' }}>  
              {!isSmallScreen && (
              
                <a href="/">
                  <img src={itsv} alt="itsv" className='logo-img' />
                </a>   
              )}           
              </Col>
              
              {/* Searchbar */}
              <Col >            
              <form onSubmit={handleSearch} className={`div-form ${isSmallScreen ? 'search-small' : 'search-large'}`}>                
                  <Autocomplete
                      className={`search-input`}
                    freeSolo
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
                  <Tooltip title="Buscar" arrow placement="bottom">
                    <Button variant="primary" type="submit" className='button' style={{borderColor: '#2E5266', color: 'rgba(235, 235, 235, 0.5)' }}>
                      <SearchRoundedIcon />
                    </Button>
                  </Tooltip>
                </form> 
              </Col>

              {/* Buttons */}
              <Col>
                {!isSmallScreen && (
                  <Tooltip title="Carrito" arrow placement="bottom">
                    <Button
                      variant="primary"
                      type="submit"
                      className='button'
                      data-toggle="tooltip" data-placement="right" title="Carrito"
                      onClick={() => { window.location.href = '/carrito' }}
                    >
                      <Badge count={parseInt(cantCarrito)} overflowCount={9} size='small' style={{backgroundColor:'#EE8F37'}}>
                        <ShoppingCartOutlinedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                      </Badge>
                    </Button>
                  </Tooltip>
                  
                )}
              </Col>

              <Col style={{ marginLeft:'0'}}>
              {!isSmallScreen && (
                <Tooltip title="Notificaciones" arrow placement="bottom">
                  <Button variant="primary" type="submit" className='button' data-toggle="tooltip" data-placement="right" title="Notificaciones">
                    <Badge count={parseInt(cantNotificaciones)} overflowCount={9} size='small' style={{backgroundColor:'#EE8F37'}}>
                      <NotificationsRoundedIcon style={{ color: 'rgba(235, 235, 235, 0.5)' }} />
                    </Badge>
                  </Button>
                </Tooltip>
                
              )}
              </Col>

              <Col style={{ marginLeft:'0rem'}}>   
              {!isSmallScreen && (
                <Tooltip title="Configuración" arrow placement="bottom">
                  <Button variant="primary" type="submit" className='button'  data-toggle="tooltip" data-placement="right" title="Configuración" onClick={() => { window.location.href = '/detalleCuenta' }}>
                    <SettingsIcon  style={{ color: 'rgba(235, 235, 235, 0.5)' } } />
                  </Button>
                </Tooltip>
              )}
              </Col>          
            </Row>
          </Container>
        </Header>
      
    </div>
  );
};

export default LayoutComponents;
