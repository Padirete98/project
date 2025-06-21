import express from 'express';
import Equipment from '../models/Equipment.js';
import axios from 'axios';

const app = express.Router();

// Crear nuevo equipo
app.post('/equipment', async (req, res) => {
    try {
        const newEquipment = new Equipment(req.body);
        const savedEquipment = await newEquipment.save();
        res.status(201).json({
            success: true,
            message: 'Equipo registrado exitosamente',
            data: savedEquipment
        });
    } catch (error) {
        console.error('Error al guardar equipo:', error);
        res.status(400).json({
            success: false,
            message: 'Error al registrar el equipo',
            error: error.message
        });
    }
});

// Obtener todos los equipos
app.get('/equipment', async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: equipment
        });
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los equipos',
            error: error.message
        });
    }
});

// Obtener un equipo por ID
app.get('/equipment/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            data: equipment
        });
    } catch (error) {
        console.error('Error al obtener equipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el equipo',
            error: error.message
        });
    }
});


// Eliminar un equipo
app.delete('/equipment/:id', async (req, res) => {
    try {
        const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!deletedEquipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Equipo eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar equipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el equipo',
            error: error.message
        });
    }
});

export default app; 