import React,{useState} from 'react';
import { Container, 
    TextField, 
    Button, 
     Typography,
     Box, TableContainer,
     Paper, Table, TableHead, TableRow, TableCell, TableBody,
     AppBar, Toolbar, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Icono from '../img/logotype.png';
import IconSearch from '../img/search.png'; // Importar el icono de búsqueda


const ViewEquipments = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState({ //creacion de esquema de consulta de reporte
    numeroSerie: '',
    fechaReporte: '',
    usuarioAsignado: [],
    estado: []
});

const [error, setError] = useState(false); //estado para mostrar errores
const [success, setSuccess] = useState(false); //estado para mostrar mensajes de exito
const [loading, setLoading] = useState(false); //estado para mostrar el estado de cargando
const [message, setMessage] = useState(''); //estado para mostrar mensajes

const logo_type = {
     padding: '1em',
     display: 'flex',
     width: '150px',
     alignItems: 'flex-start', 
     justifyContent: 'center',
};
const logo_search = {
    padding: '0em',
    display: 'flex-end',
    width: '30px',
    alignItems: 'flex-end',
    justifyContent: 'center',
};

const handleChange = (e) => { //
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

//verificar conexion db
const handleSubmit = async (e) => {
    e.preventDefault();
    
//que el usuario ingrese el numero de serie del equipo a consultar
    // Validar campos requeridos
    const requiredFields = ['numeroSerie'];
    const missingFields = requiredFields.filter(field => !formData[field]); 



    if (missingFields.length > 0) {
        setError(true);
        setMessage('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    setLoading(true);
    setError(false);
    
try{
    // Realizar la consulta al servidor
    const response = await fetch(`http://localhost:3001/searchreport?numeroSerie=${formData.numeroSerie}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    const result = await response.json();
    
    if (response.ok) {
        setSuccess(true);
        setMessage('Reporte encontrado exitosamente');
        // Aquí podrías manejar el resultado del reporte encontrado
        console.log(result);
    } else {
        setError(true);
        setMessage(result.message || 'Error al consultar el reporte');
    }
    } catch (err) {
        console.error('Error:', err);
        setError(true);
        setMessage('Error de conexión. Verifica que el servidor esté ejecutándose.');
    } finally {
        setLoading(false);
    }

};

const handleLogout = () => {
    navigate('/'); // regresar a la ruta raíz
};

const handleMenu = () => {
    navigate('/Menu'); // regresar a la ruta menu
};

const handleCloseSnackbar = () => {
    setError(false);
    setSuccess(false);
    setMessage('');
};
const handleSearch = () => {
    // Aquí podrías implementar la lógica para buscar el reporte
    handleSubmit();

};
    return(
    <div>
    <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src={Icono} style={logo_type} alt="Logo de la página web" />
          </Typography>
          <Button color="inherit" onClick={handleMenu}>
            Menu
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    

    <Container  sx={{ mt: 18, bgcolor: '#ffe4ec', p:5, borderRadius: 2 }} >
        <Typography variant="h6" gutterBottom>
        Consulta de Equipos
        </Typography>

        
<TableContainer component={Paper}>
        <Table>
         <TableHead>
            <TableRow>
                <TableCell><strong>Número de Serie</strong></TableCell>
                <TableCell><strong>Nombre Usuario</strong></TableCell>
                <TableCell><strong>Nombre de equipo</strong></TableCell>
                <TableCell><strong>Tipo de equipo</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Accesorios</strong></TableCell>
                <TableCell><strong>Descripcion</strong></TableCell>                
                </TableRow>
        </TableHead>
        <TableBody>

            <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
          
        </TableBody>
        </Table>
        </TableContainer>






    </Container>

    {/* Snackbar para mostrar mensajes */}
    <Snackbar
        open={error || success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert 
            onClose={handleCloseSnackbar} 
            severity={error ? 'error' : 'success'} 
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar>
</div>
);
};

export default ViewEquipments;
