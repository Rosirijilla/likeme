//Acá la estructura del servidor.

//Importar
const express = require ('express');
const cors = require ('cors');
const {conseguirPost, crearPost, editarPost, eliminarPost} = require('./consultas');

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

//Ruta crear post
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

//Ruta editar post
app.put('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const {likes} = req.body;

    //Validar datos
    if(typeof likes !== 'number'){
        return res.status(400).json({error: 'El campo "likes tiene que ser un número.'});
    }

    //Manejo de errores.
    try{
        const postActualizado = await editarPost(id, likes); //Llamando func. editar post.
        if(!postActualizado){
            return res.status(404).json({error: 'Post no encontrado.'});
        } 
        res.json(postActualizado); //Devolver post ya actializado.   
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//Ruta eliminar post
app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;

    //Manejo de errores.
    try{
        const postEliminado = await eliminarPost(id); //Llamando func. eliminar post.
        if(!postEliminado){
            return res.status(404).json({error: 'Post no encontrado.'});
        } 
        res.json({message: 'Post eliminado correctamente.', post: postEliminado}); //Actualizar los post con post ya eliminado.   
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//Levantar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor está corriendo en http://localhost:${PORT}`));
