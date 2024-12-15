//Acá dejaré todo lo de la conexión con la base de datos.

//Configuración conexión base datos postgresql.
const { Pool } = require("pg");

//Datos conexión
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "likeme",
  allowExitOnIdle: true, // Cierra conexiones inactivas automáticamente.
});

//Func. Conseguir los posts
const conseguirPost = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows; // Devuelve los registros.
  } catch (error) {
    throw new Error("Error al obtener los posts:" + error.messaje);
  }
};

//Func. Crear nuevo post.
const crearPost = async (titulo, img, descripcion, likes) => {
  //Pasar los parámetros.
  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, likes]
    );
    return result.rows[0]; //DEvolver registros nuevos.
  } catch (error) {
    throw new Error("Error al crear el Post:" + error.message);
  }
};

//Func. Editar post.
const editarPost = async (id) => {
  try {
    const result = await pool.query(
      "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0]; //Devolver actualización
  } catch (error) {
    throw new Error("Error al editar el post" + error.message);
  }
};

//Func. Eliminar post.
const eliminarPost = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0]; //Devolver registro eliminado.
  } catch (error) {
    throw new Error("Error al eliminar el posr:" + error.message);
  }
};

module.exports = { conseguirPost, crearPost, editarPost, eliminarPost }; //Para exportar.
