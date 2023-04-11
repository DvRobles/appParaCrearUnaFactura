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



//AQUII
// Configurar la conexión a la base de datos

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxxxxx',
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

	const factura = {
		fecha:'2023/03/23', 
		total:150, 
		productos:[{id:1,cantidad:5,costo:10},{id:2,cantidad:5,costo:20}]
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


//intento 1
function insertarCliente(cliente) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO clientes (id, nombre, RFC, CP, email, ciudad) VALUES ("${cliente.id}","${cliente.nombre}","${cliente.rfc}","${cliente.CP}","${cliente.email}","${cliente.ciudad}");`
      //const values = [cliente.nombre, cliente.rfc, cliente.ciudad, cliente.email];
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }

  
  function crearFactura(clienteId, factura) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO facturas (cliente_id, fecha, total) VALUES ("${cliente.id}", "${factura.fecha}", "${factura.total}");`
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }

  
  function insertarDetallesFactura(facturaId, detallesFactura) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction(error => {
        if (error) {
          reject(error);
        } else {
          detallesFactura.forEach(detalleFactura => {
            const query1 = `INSERT INTO detalles_factura (factura_id, producto_id, cantidad, costo) VALUES (?, ?, ?, ?)`;
            const values1 = [facturaId, detalleFactura.id, detalleFactura.cantidad, detalleFactura.costo];
            connection.query(query1, values1, error1 => {
              if (error1) {
                connection.rollback(() => reject(error1));
              } else {
                const query2 = `UPDATE productos SET cantidad = cantidad - ? WHERE id = ?`;
                const values2 = [detalleFactura.cantidad, detalleFactura.id];
                connection.query(query2, values2, error2 => {
                  if (error2) {
                    connection.rollback(() => reject(error2));
                  } else {
                    resolve();
                  }
                });
              }
            });
          });
          connection.commit(error => {
            if (error) {
              connection.rollback(() => reject(error));
            }
          });
        }
      });
    });
  }

  
  async function crearFacturaCompleta(cliente, factura) {
    try {
    const clienteId = await insertarCliente(cliente);
    const facturaId = await crearFactura(clienteId, factura);
    await insertarDetallesFactura(facturaId, factura.productos);
    console.log(`La factura con folio ${facturaId} se ha creado correctamente.`);
    } catch (error) {
    console.error(error);
    } finally {
    connection.end();
    }
    }



crearFacturaCompleta(cliente, factura);







      //ej 

//connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//connection.query('SELECT * from clientes', function (error, results, fields) {
    
//connection.query('INSERT INTO clientes VALUES (3,"manu","mannu",3,"manu@ucol.mx","gdl");', function (error, results, fields) {
    //if (error) throw error;
    //console.log('The solution is: ', results[0].solution)
    //console.log(fields);;
    //console.log('The solution is: ', results);
//});

connection.end();

//FIN


