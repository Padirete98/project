import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    numeroSerie: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fechaReporte: {
        type: String,
        required: true,
        trim: true
    },
    usuarioAsignado: {
        type: String,
        required: true,
        enum: ['Oscar Lucero', 'Fernanda Aguilar', 'Tere Reyna']
    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Alta', 'Media', 'Baja']
    },
    estado: {
        type: String,
        required: true,
        enum: ['Informado', 'En curso', 'Terminado']
    },
    hallazgo: {
        type: String,
        required: true,
        trim: true
    },
    acciones: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Report', reportSchema); 