import index from './index.js';

const PORT = process.env.PORT || 3000;


//inicializar servidor
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});