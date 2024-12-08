//Acá la estructura del servidor.

//Importar
const express = require ('express');
const cors = require ('cors');
const {conseguirPost, crearPost} = require('./consultas');

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());

//Ruta get obtener posts
app.get('/posts', async (req, res)=>{
    try{
        const posts = await conseguirPost();
        res.json(posts);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

app.post('/posts', async (req, res)=>{
    const {titulo, img, descripcion, likes}= req.body;

    //Manejo errores.
    if(!titulo || !img || !descripcion || likes === undefined){
        console.log('Datos faltantes o inválidos:', req.body);
        return res.status(400).json({error:'Todos los campos son obligatorios.'});
    }

    if(typeof likes !== 'number'){
        console.log('Campo "likes" debe ser un número:', likes);
        return req.status(400).json({error: 'Los likes deben ser únicamente números.'})
    }

    try{
        const nuevoPost = await crearPost(titulo, img, descripcion, likes); //Pasar los parámetros.
        res.status(201).json(nuevoPost);
    }catch (error){
        res.status(500).json({error: error.message});
    }
});

//Levantar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor está corriendo en http://localhost:${PORT}`));
