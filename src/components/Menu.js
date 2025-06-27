import React from 'react';
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Icono from '../img/logotype.png';

const Menu = () => {

  const navigate = useNavigate(); // Declarar navigate 

  const logo_type = {
    padding: '1em',
    display: 'flex',
    width: '150px',
    alignItems: 'flex-start', 
    justifyContent: 'center',
  };
  const handleLogout = () => {
    navigate('/'); // regresar a la ruta raíz

  };

  const handleAddEquip = () => {
    navigate('/AddEquipment'); // ir a la ruta registro de equipos

  };

    const handleAddReport = () => {
    navigate('/AddReport'); // ir a la ruta registro de informes
  };

      const handleSearchReport = () => {
    navigate('/SearchReport'); // ir a la ruta consulta de informes
  };
      const handleViewEquipments = () => {
    navigate('/ViewEquipments'); // ir a la ruta consulta de equipos
  };
  

  return (
    <div >
      <AppBar >
        <Toolbar position='static' >
          <Typography variant="h6" sx={{ flexGrow: 1 }} >
            <img src={Icono} style={logo_type} alt="Logo de la página web" />
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 20, borderRadius: 2 }} >
          <Box 
           p={3}
          backgroundColor='#dcffcf'
          height={400}
          width={500}
          justify-content= 'center'
          align-items='start'
          flex-direction='center'
          borderRadius='6'
           display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
           >
        <Typography variant="h5" sx={{ mt: -10, borderRadius: 2 }}> Selecciona una opcion </Typography>
        <Button
        onClick={handleAddEquip}
            type="submit" 
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            >
            Añadir Equipo
        </Button>

        <Button
        onClick={handleAddReport}
            type="submit" 
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            >
            Añadir Informe
        </Button>

        <Button
        onClick={handleSearchReport}
            type="submit" 
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            >
            Ver status de Informe
        </Button>

        <Button
        onClick={handleViewEquipments}
            type="submit" 
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            >
            Ver Equipos
        </Button>
        
        </Box>
        </Container>
    </div>
  );
};

export default Menu;
