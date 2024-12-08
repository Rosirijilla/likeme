//Acá dejaré todo lo de la conexión con la base de datos.

//Configuración conexión base datos postgresql.
const { Pool } = require('pg')

//Datos conexión
const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: '1234',
database: 'likeme',
allowExitOnIdle: true, // Cierra conexiones inactivas automáticamente.
});

//Func. Conseguir los posts
const conseguirPost = async ()=>{
    const result = await pool.query('SELECT * FROM posts');
    return result.rows; // Devuelve los registros.
}

//Func. Crear nuevo post.
const crearPost = async (titulo, img, descripcion, likes) => { //Pasar los parámetros.
    const result = await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
    [titulo, img, descripcion, likes]
  );
  return result.rows[0]; //DEvolver registros nuevos.
}

module.exports = {conseguirPost, crearPost}; //Para exportar.