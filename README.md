# Sistema de Gestión de Equipos de Cómputo

Este proyecto es un sistema completo para la gestión de equipos de cómputo que incluye un frontend en React y un backend en Node.js con MongoDB.

## Características

- ✅ Registro de equipos de cómputo
- ✅ Gestión de accesorios
- ✅ Validación de formularios
- ✅ Interfaz moderna con Material-UI
- ✅ Base de datos MongoDB
- ✅ API REST completa

## Requisitos Previos

- Node.js (versión 16 o superior)
- MongoDB instalado y ejecutándose localmente
- npm o yarn

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd finalproject
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar MongoDB**
   - Asegúrate de que MongoDB esté instalado y ejecutándose en tu máquina
   - El proyecto se conectará automáticamente a la base de datos `project` en `mongodb://localhost:27017/project`

4. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   MONGODB_URI=mongodb://localhost:27017/project
   PORT=5000
   NODE_ENV=development
   ```

## Ejecución

### Opción 1: Ejecutar frontend y backend por separado

1. **Iniciar el servidor backend**
   ```bash
   npm run server
   ```
   El servidor se ejecutará en `http://localhost:5000`

2. **En otra terminal, iniciar el frontend**
   ```bash
   npm start
   ```
   La aplicación React se ejecutará en `http://localhost:3000`

### Opción 2: Ejecutar ambos simultáneamente (requiere concurrently)

1. **Instalar concurrently globalmente**
   ```bash
   npm install -g concurrently
   ```

2. **Ejecutar ambos servicios**
   ```bash
   npm run dev
   ```

## Uso

1. Abre tu navegador y ve a `http://localhost:3000`
2. Navega al formulario de registro de equipos
3. Completa todos los campos requeridos
4. Haz clic en "Registrar"
5. Los datos se guardarán automáticamente en la base de datos MongoDB

## Estructura del Proyecto

```
finalproject/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AddEquipment.js  # Formulario de registro
│   │   ├── Menu.js         # Menú principal
│   │   └── Auth.js         # Autenticación
│   ├── models/         # Modelos de MongoDB
│   │   └── Equipment.js
│   ├── routes/         # Rutas de la API
│   │   └── equipment.js
│   └── config/
│       └── db.js           # Configuración de MongoDB
├── server.js               # Servidor Express
├── package.json
└── README.md
```

## API Endpoints

- `POST /api/equipment` - Crear nuevo equipo
- `GET /api/equipment` - Obtener todos los equipos
- `GET /api/equipment/:id` - Obtener equipo por ID
- `DELETE /api/equipment/:id` - Eliminar equipo

## Tecnologías Utilizadas

- **Frontend**: React, Material-UI, React Router
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Herramientas**: dotenv, cors

## Solución de Problemas

### Error de conexión a MongoDB
- Verifica que MongoDB esté ejecutándose: `mongod`
- Comprueba que la URL de conexión sea correcta en el archivo `.env`

### Error de CORS
- El servidor ya incluye configuración CORS para desarrollo
- Verifica que el frontend esté haciendo peticiones a `http://localhost:5000`

### Puerto ocupado
- Cambia el puerto en el archivo `.env` si el puerto 5000 está ocupado
- Asegúrate de actualizar la URL en el frontend si cambias el puerto

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.
