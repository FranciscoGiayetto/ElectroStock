import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import useAxios from "../../utils/useAxios";
import { useAuthStore } from '../../store/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import defaultpicture from '../../assets/images/defaultpicture.png';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
 
  {
    title: 'Componente',
    subheader: 'Texto de ejemplo',
    description: [
      'Prestatario',
      'Aprobado',
      'Fecha de pedido','Componentes disponibles',
      'Fecha de devolucion',
      'Acerca de',
      
    ],
    buttonText: 'Volver al prestamo',
    buttonVariant: 'contained',
  },
  {

    description: [
      <img src={defaultpicture} alt='Imagen' className='img-fluid product-details__image' />

    ]
   
  },
  {
    title: 'Que desea hacer?',
    description: [
      <Button variant="contained" color="success">
  Aceptar
</Button>,
<span>ㅤ</span>,
<Button variant="outlined" color="error">
  Rechazar
</Button>   
  ],
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function DetallePrestamo() {
  const api = useAxios(); 
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const userData = user();
  const navigate = useNavigate(); 

  useEffect(() => { 
    console.log('SE EJECUTÓ EL USE')
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      console.log(userData.user_id);
      const response = await api.get(`/pendientes/${userData.user_id}`);
      let data = await response.data;
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline />
  
    {/* Hero unit */}
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
    <Typography
  component="h2"
  variant="h3"
  align="center"
  color="text.primary"
  gutterBottom
  sx={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem' }}
>
  Prestamo de Nari
</Typography>

</Container>

     
    </Container>
    {/* End hero unit */}
    <Container maxWidth="md" component="main" className='container47' sx={{ marginTop: 0 }}>      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={tier.title === 'Detalles del prestamo 2'}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  
                </Box>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
              <Button fullWidth variant={tier.buttonVariant}>
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    
  </ThemeProvider>
);
}

export default DetallePrestamo;
