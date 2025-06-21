import React,{useState} from 'react';
import { Container, TextField, MenuItem, FormControlLabel, Checkbox, Button, Typography, FormGroup, Box, AppBar, Toolbar, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Icono from '../img/logotype.png';


const accessoriesList = [
  'Cargador', 'Mouse', 'Teclado', 'Monitor', 'CPU',
  'Multipuerto', 'Base Enfriadora', 'Adaptador de Red'
];

const AddEquipment = () => {

const navigate = useNavigate();
const [formData, setFormData] = useState({ //creacion de esquema de añadir neuvo equipoo utilizando un arreglo
    nombreUsuario: '',
    nombreEquipo: '',
    numeroSerie: '',
    tipoEquipo: '',
    estado: '',
    accesorios: [],
    fechaAsignacion: '',
    fechaCompra: '',
    observaciones: ''
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

const handleAccessoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
    ...prev,
        accesorios: checked
        ? [...prev.accesorios, value]// si el checkbox esta marcado, se agrega el valor al array
        : prev.accesorios.filter(item => item !== value)// si el checkbox esta desmarcado, se elimina el valor del array
    }));
};  

//verificar conexion db
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const requiredFields = ['nombreUsuario', 'nombreEquipo', 'numeroSerie', 'tipoEquipo', 'estado', 'fechaAsignacion', 'fechaCompra'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
        setError(true);
        setMessage('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    setLoading(true);
    setError(false);
    
    try {
        const response = await fetch('http://localhost:3001/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            setSuccess(true);
            setMessage('Equipo registrado exitosamente');
            // Limpiar formulario
            setFormData({
                nombreUsuario: '',
                nombreEquipo: '',
                numeroSerie: '',
                tipoEquipo: '',
                estado: '',
                accesorios: [],
                fechaAsignacion: '',
                fechaCompra: '',
                observaciones: ''
            });
            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/Menu');
            }, 2000);
        } else {
            setError(true);
            setMessage(result.message || 'Error al registrar el equipo');
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
        <Toolbar padding="50px">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src={Icono} style={logo_type} alt="Logo de la página web" />
          </Typography>
          <Typography variant="h3" sx={{ flexGrow: 1 }}>Bienvenido</Typography>
          <Button color="inherit" onClick={handleMenu}>
            Menu
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    
<Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#ffe4ec', p: 4, borderRadius: 2 }} margin="70px">
        <Typography variant="h5" gutterBottom color="secondary">Registro de Equipos de Cómputo</Typography>
        
        <form onSubmit={handleSubmit}>
        <TextField 
            fullWidth 
            label="Nombre del Usuario" 
            name="nombreUsuario" 
            margin="normal" 
            onChange={handleChange}
            value={formData.nombreUsuario}
            required
        />
        <TextField 
            fullWidth 
            label="Nombre del Equipo" 
            name="nombreEquipo" 
            margin="normal" 
            onChange={handleChange}
            value={formData.nombreEquipo}
            required
        />
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
            select 
            fullWidth 
            label="Tipo de Equipo" 
            name="tipoEquipo" 
            margin="normal" 
            onChange={handleChange}
            value={formData.tipoEquipo}
            required
        >
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="PC">PC</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
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
        <MenuItem value="Nuevo">Nuevo</MenuItem>
        <MenuItem value="Reasignado">Reasignado</MenuItem>
        </TextField>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Accesorios:</Typography>
        <FormGroup>
            {accessoriesList.map((item) => (
            <FormControlLabel
            key={item}
            control={
            <Checkbox 
                value={item} 
                onChange={handleAccessoryChange}
                checked={formData.accesorios.includes(item)}
            />
            }
                label={item}
            />
            ))}
        </FormGroup>
        <TextField
            fullWidth 
            type="date" 
            label="Fecha de Asignación" 
            name="fechaAsignacion"
            margin="normal" 
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange}
            value={formData.fechaAsignacion}
            required
        />
        <TextField
            fullWidth 
            type="date" 
            label="Fecha de Compra" 
            name="fechaCompra"
            margin="normal" 
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange}
            value={formData.fechaCompra}
            required
        />
        <TextField
        fullWidth 
        multiline 
        rows={3} 
        label="Observaciones" 
        name="observaciones"
        margin="normal" 
        onChange={handleChange}
        value={formData.observaciones}
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

export default AddEquipment;
