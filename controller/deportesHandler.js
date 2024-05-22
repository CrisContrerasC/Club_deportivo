import fs from 'fs';
//cracion de variables de entorno
import { fileURLToPath } from 'url';
import { dirname } from "path";

//variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


//Path para crear en la raiz del proyecto la carpeta db
const path = `${__dirname}/../db/deportes.json`

//INICIAMOS NUESTRO CRUD

//Función Post: Crear deporte
export const postDeportesHandler = (req, res) => {
  try {
    const { nombre, precio } = req.query
    if (typeof (nombre) !== 'string' && typeof (precio) !== 'string') {
      throw new Error('Datos inválidos, título y descripción de ser un string')
    }

    const database = JSON.parse(fs.readFileSync(path, 'utf-8'));

    //agregamos el nuevo deporte
    database.push({ nombre, precio });
    fs.writeFileSync(path, JSON.stringify(database));

    res.status(200).send(database);
    console.log("Deporte agregado:", database)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

//función get
export const getDeportesHandler = (req, res) => {

  try {
    // Leemos el archivo
    const database = fs.readFileSync(path, 'utf-8');
    res.status(200).send(JSON.parse(database)); // JSON.parse convierte un string a un objeto de JS (data);
    console.log("Salida database: ", database)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//funcion put: actualización de la data
export const putDeportesHandler = (req, res) => {
  const { nombre, precio } = req.query
  console.log("Entrada de nombre: ", nombre)
  console.log("Entrada de precio: ", precio)
  try {
    let database = JSON.parse(fs.readFileSync(path, 'utf-8'));
    console.log("Salida de database: ", database)
    //Recorremos el database y si el nombre coincide, se actualiza el precio
    database.forEach((deporte) => {
      if (deporte.nombre === nombre) {
        deporte.precio = precio
      }
    })

    fs.writeFileSync(path, JSON.stringify(database));
    res.status(200).send(database)
    console.log("Salida de database actualizada: ", database)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//Funcion Delete: borrar deporte
export const deleteDeporteHandler = (req, res) => {
  const { nombre } = req.query;
  try {
    let database = JSON.parse(fs.readFileSync(path, "utf-8"));
    const id = database.findIndex((deporte) => deporte.nombre === nombre);
    if (id === -1) {
      throw new Error('No se encontro deporte')
    }
    else {
      database.splice(id, 1)      
    }
    fs.writeFileSync(path, JSON.stringify(database))
    res.send(`El deporte ${nombre} se elimino correctamente.`)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}
