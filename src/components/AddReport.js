import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from '@mui/material';

const AddReport = () => {
    return(
    
       <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>

                <Button color="inherit">Mi perfil</Button>
                <Button color="inherit">Ajustes</Button>
                <Button color="inherit">Cerrar sesión</Button>
                
            </Toolbar>
        </AppBar>
        
        <Box p={4}>
            <Typography variant ="h4">Bienvenido al Dashboard </Typography>
            <Typography>Este es el panel privado despues del panel.</Typography>
        </Box>
        </div>
    );
}

export default AddReport;