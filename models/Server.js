// Importamos express
import express from 'express';
// Importamos nuestro motor de plantilla
import { create } from 'express-handlebars';

// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// IMPORTAMOS NUESTRAS VISTAS
//Se crean rutas PostDeporte, GetDeporte,PutDeporte y DeleteDeporte

import vistaHomeRoute from '../routes/vistaHome.routes.js';
import apiRootPostDeporteRoute from '../routes/apiRootPostDeporte.routes.js';
import apiRootGetDeportesRoute from '../routes/apiRootGetDeporte.routes.js';
import apiRootPutDeportesRoute from '../routes/apiRootPutDeporte.routes.js';
import apiRootDeleteDeporteRoute from '../routes/apiRootDeleteDeporte.routes.js';
// Creamos nuestro modelo o clase de servidor

class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        // Cramos la app  de express
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.backEndApi = {
            rootHome:'/',
            rootAgregar:'/agregar',
            rootDeportes:'/deportes',
            rootEditar:'/editar',
            rootEliminar:'/eliminar'
        }

// En este objeto se centralizan todas las rutas
        this.frontEndPaths = {
            rootHome:'/',
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use('/css', express.static(`${__dirname}/../public/assets/css`));
        this.app.use('/img', express.static( `${__dirname}/../public/assets/img`));
        this.app.use('/js', express.static( `${__dirname}/../public/assets/js`));
        this.app.use('/jquery', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        
        // Ruta de CSS para Bootstrap
        this.app.use('/bootstrap', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrapjs', express.static( `${__dirname}/../node_modules/bootstrap/dist/js`));
        this.app.use('/bootstrapIcons', express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`  ));
    }


    routes(){
        //crear ruta que tome la vista home
        this.app.use( '/', vistaHomeRoute );
     
        //ROUTING CRUD API
        //post CREAR deporte
       this.app.use( this.backEndApi.rootAgregar, apiRootPostDeporteRoute );
        // GET imprimir la data en el front
       this.app.use( this.backEndApi.rootDeportes, apiRootGetDeportesRoute);
        //PUT actualizar
        this.app.use( this.backEndApi.rootEditar, apiRootPutDeportesRoute );
        //DELETE borrar
        this.app.use(this.backEndApi.rootEliminar, apiRootDeleteDeporteRoute);
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }

}

export default Server;