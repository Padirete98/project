import mongoose from 'mongoose';

//conectar a la dB
const conectDB = async()=>{
     mongoose.connect(process.env.MONGODB_URI)
     .then(()=>console.log('Conexion a MongoDB exitosa'))
     .catch(err => console.log('Error de conexion a MongoDB: ', err));
 }
export default conectDB;