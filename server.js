import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import equipmentRoutes from './src/routes/equipment.js';
import reportRoutes from './src/routes/report.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = 3001;

// Conectar a MongoDB
connectDB();


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(equipmentRoutes);

//Rutas de reportes
app.use(reportRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Gestión de Equipos funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 