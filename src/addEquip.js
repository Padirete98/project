import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const addEquip = () => {
  
const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
    <Typography variant="h4" color="secondary" gutterBottom>
        ¡Registro exitoso!
    </Typography>
    <Button variant="outlined" color="secondary" onClick={() => navigate('/Menu')}>
        Volver al formulario
    </Button>
    </Container>
  );
};

export default addEquip;
