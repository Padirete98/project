import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true
    },
    nombreEquipo: {
        type: String,
        required: true,
        trim: true
    },
    numeroSerie: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tipoEquipo: {
        type: String,
        required: true,
        enum: ['Laptop', 'PC', 'Tablet']
    },
    estado: {
        type: String,
        required: true,
        enum: ['Nuevo', 'Reasignado']
    },
    accesorios: [{
        type: String,
        enum: ['Cargador', 'Mouse', 'Teclado', 'Monitor', 'CPU', 'Multipuerto', 'Base Enfriadora', 'Adaptador de Red']
    }],
    fechaAsignacion: {
        type: Date,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    observaciones: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Equipment', equipmentSchema); 