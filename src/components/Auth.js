import React, { useState } from 'react';// para poder importar react y sus hooks para la parte de login
import { AppBar, Toolbar,TextField, Button, Container, Typography, Box, Alert} from '@mui/material'; //improtar material design para el diseño de la parte de login
import { useNavigate } from 'react-router-dom'; //importar el hooks de navegacion de react-router-dom
import Icono from '../img/logotype.png';

const logo_type ={
    padding: '1em',
    display:"flex-start",
    width: '150px',
    align_items: 'flex-start',
    justify_content: 'center',
    };

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); // estado para el error
    const navigate = useNavigate(); // inicializar el hooks de navegacion

//npm i react-router-dom sirve para la navegacion entre componentes o secciones de mi plataforma/app

const handleAuth = (e) =>{//
    e.preventDefault();// prevenir el comportamiento por defecto de la carga de la pagina
    if ( username === 'admin' && password === 'admin123'){
        setError(false);// si es correcto, elimina el error en  la consola
        navigate('/Menu');//Si es correcto, nos dirige al dashboard, perfil, etc
    }else{
        setError(true);//Si es incorrecto, muestra el error
    }
}
return(
    <div>
        <AppBar>
            <Toolbar>
                <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                    <img src={ Icono } style={logo_type} alt="Logo de la página web"/>
                </Typography>           
            </Toolbar>
        </AppBar>
 <Container maxWidth="xs"  sx={{ mt: 20, p: 4, borderRadius: 2 }}  >
        {}
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            backgroundPosition= 'center'
            borderRadius={1}
 >
            
            {/*TITULO PRINCIPAL */}
            <Typography variant="h4" component="h1" gutterBottom>
                Iniciar Sesion
            </Typography>
            
                {/* ALERTA DE ERROR */}
                {error && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Usuario o contraseña incorrectas
                    </Alert>
                )}

                <form onSubmit={handleAuth} style={{ width: '100%' }}  >
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        >
                            Ingresar
                    </Button>
                </form>
        </Box>

</Container>
        </div>

        
);
};

export default Auth; //exportar Login para poder usarlo en el index.js o en la 

