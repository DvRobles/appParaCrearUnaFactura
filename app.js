// Configurar la conexión a la base de datos

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'minegocio',
});

connection.connect();
// Conectar a la base de datos

//   connection.connect((err) => {
//     if (err) {
//       console.error('Error al conectar a la base de datos: ', err);
//       return;
//     }
  
//     console.log('Conexión exitosa a la base de datos.');

    // Definir los datos del cliente

    const cliente = {
      id: 4, 
      nombre: 'Nepomuceno',
      rfc: 'NEPO231010',
      CP: 4,
      email: 'conocido@gmail.com',
      ciudad: 'Colima'
    };

    // Crear cliente

    connection.query(
        `INSERT INTO clientes (id, nombre, RFC, CP, email, ciudad) VALUES ("${cliente.id}","${cliente.nombre}","${cliente.rfc}","${cliente.CP}","${cliente.email}","${cliente.ciudad}");`, function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                console.log(results);
                console.log(fields);
            }
}
);







connection.end();
