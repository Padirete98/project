import React,{useState} from 'react';
import { Container, TextField, MenuItem, Button, Typography, Box, AppBar, Toolbar, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Icono from '../img/logotype.png';

const AddReport = () => {

const navigate = useNavigate();
const [formData, setFormData] = useState({ //creacion de esquema de añadir nuevo reporte de falla, un arreglo
    numeroSerie: '',
    fechaReporte: '',
    usuarioAsignado: [],
    prioridad: [],
    estado: [],
    hallazgo: '',
    acciones: ''
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

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

//verificar conexion db
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const requiredFields = ['numeroSerie', 'fechaReporte', 'usuarioAsignado', 'prioridad', 'estado', 'hallazgo', 'acciones'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
        setError(true);
        setMessage('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    setLoading(true);
    setError(false);
    
    try {
        const response = await fetch('http://localhost:3001/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            setSuccess(true);
            setMessage('Reporte enviado exitosamente');
            // Limpiar formulario
            setFormData({
                numeroSerie: '',
                fechaReporte: '',
                usuarioAsignado: [],
                prioridad: [],
                estado: [],
                hallazgo: '',
                acciones: ''
            });
            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/AddReport'); // Redirigir a la misma página para registrar otro reporte
            }, 2000);
        } else {
            setError(true);
            setMessage(result.message || 'Error al registrar el reporte');
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
    
<Container maxWidth="sm" sx={{ mt: 20, bgcolor: '#ffe4ec', p: 4, borderRadius: 2 }}  >
        <Typography variant="h5" gutterBottom color="secondary">Registro de Reporte de Fallas</Typography>
        
        <form onSubmit={handleSubmit}>
        <TextField 
            fullWidth 
            label="Número de Serie" 
            name="numeroSerie" 
            margin="normal" 
            onChange={handleChange}
            value={formData.numeroSerie}
            required
        />
        <TextField 
            fullWidth 
            type="date" 
            label="Fecha de Reporte" 
            name="fechaReporte"
            margin="normal" 
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange}
            value={formData.fechaReporte}
            required
        />
        <TextField 
            select 
            fullWidth 
            label="Asignado a:" 
            name="usuarioAsignado" 
            margin="normal" 
            onChange={handleChange}
            value={formData.usuarioAsignado}
            required
        >
        <MenuItem value="Oscar Lucero">Oscar Lucero</MenuItem>
        <MenuItem value="Fernanda Aguilar">Fernanda Aguilar</MenuItem>
        <MenuItem value="Tere Reyna">Tere Reyna</MenuItem>
        </TextField>
        
        <TextField 
            select 
            fullWidth 
            label="Prioridad" 
            name="prioridad" 
            margin="normal" 
            onChange={handleChange}
            value={formData.prioridad}
            required
        >
        <MenuItem value="Alta">Alta</MenuItem>
        <MenuItem value="Media">Media</MenuItem>
        <MenuItem value="Baja">Baja</MenuItem>
        </TextField>

        <TextField 
            select 
            fullWidth 
            label="Estado" 
            name="estado" 
            margin="normal" 
            onChange={handleChange}
            value={formData.estado}
            required
        >
        <MenuItem value="Informado">Informado</MenuItem>
        <MenuItem value="En curso">En curso</MenuItem>
        <MenuItem value="Terminado">Terminado</MenuItem>
        </TextField>
        
        <TextField
        fullWidth 
        multiline 
        rows={6} 
        label="Hallazgo" 
        name="hallazgo"
        margin="normal" 
        onChange={handleChange}
        value={formData.hallazgo}
        />
        
        <TextField
        fullWidth 
        multiline 
        rows={6} 
        label="Acciones" 
        name="acciones"
        margin="normal" 
        onChange={handleChange}
        value={formData.acciones}
        />
        <Box textAlign="center" mt={3}>
            <Button 
                variant="contained" 
                color="secondary" 
                type="submit"
                disabled={loading}
            >
                {loading ? 'Registrando...' : 'Registrar'}
            </Button>
        </Box>
    </form>
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

export default AddReport;
