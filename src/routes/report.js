import express from 'express';
import Report from '../models/Report.js';

const app = express.Router();

//Buscar equipo en reporte por ID

// Crear nuevo equipo
app.post('/report', async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json({
            success: true,
            message: 'Reporte enviado exitosamente',
            data: savedReport
        });
    } catch (error) {
        console.error('Error al guardar reporte:', error);
        res.status(400).json({
            success: false,
            message: 'Error al registrar el reporte',
            error: error.message
        });
    }
});



// Obtener todos los reportes
app.get('/report', async (req, res) => {
    try {
        const report = await Report.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('Error al obtener los reportes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los reportes',
            error: error.message
        });
    }
});

export default app; 


// Obtener un reporte por ID de equipo *PENDIENTE*
// app.get('/report/:id', async (req, res) => {
//     try {
//         const report = await Report.findById(req.params.id);
//         if (!report) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Reporte no encontrado'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: report
//         });
//     } catch (error) {
//         console.error('Error al obtener reporte:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error al obtener el reporte',
//             error: error.message
//         });
//     }
// });

// Actualizar un reporte por ID de equipo
// app.put('/report/:id', async (req, res) => {
//     try {
//         const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedReport) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Reporte no encontrado'
//             });
//         }res.status(200).json({
//             success: true,
//             message: 'Reporte actualizado exitosamente',
//             data: updatedReport
//             });
//         } catch (error) {
//         console.error('Error al obtener equipo:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error al obtener el equipo',
//             error: error.message
//         });
//         }

//   });      

// Eliminar un equipo
// app.delete('/equipment/:id', async (req, res) => {
//     try {
//         const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
//         if (!deletedEquipment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Equipo no encontrado'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Equipo eliminado exitosamente'
//         });
//     } catch (error) {
//         console.error('Error al eliminar equipo:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error al eliminar el equipo',
//             error: error.message
//         });
//     }

