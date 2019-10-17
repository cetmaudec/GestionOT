
const mysql = require('mysql');
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cetma2019",
  database: "rozto_gestion"
});

const app = express()

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors())

app.get('/cliente', (req, res) => {
    con.query('SELECT * FROM cliente;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/actividad', (req, res) => {
  con.query('SELECT * FROM actividad;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/tipo', (req, res) => {
  con.query('SELECT * FROM tipo;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/marca', (req, res) => {
  con.query('SELECT * FROM marca;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/modelo', (req, res) => {
  con.query('SELECT * FROM modelo;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/marca-modelo', (req, res) => {
  con.query('SELECT * FROM modelo, marca WHERE modelo.marca=marca.idMarca;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/motocicleta', (req, res) => {
  con.query('SELECT * FROM motocicleta;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/prioridad', (req, res) => {
  con.query('SELECT * FROM prioridad;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/orden-trabajo', (req, res) => {
  con.query('SELECT * FROM orden_trabajo;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

//SELECT ELEMENT
app.get('/select-cliente/:id' , (req, res, next) => {
  con.query(`SELECT * FROM cliente WHERE cliente.idCliente = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/select-actividad/:id' , (req, res, next) => {
  con.query(`SELECT idRelacion, ordenTrabajo, actividad_id, actividad, costo, materiales, DATE_FORMAT(fecha_inicio, "%e/%m/%Y") as fecha_inicio, DATE_FORMAT(fecha_finalizado, "%e/%m/%Y") as fecha_finalizado, tiempo_estimado, tiempo_real FROM act_OT WHERE act_OT.idRelacion= ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/select-act/:id' , (req, res, next) => {
  con.query(`SELECT * FROM act_OT WHERE act_OT.ordenTrabajo = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

//SELECT ELEMENTS
//Select OTs de un cliente
app.get('/select-ot/:id' , (req, res, next) => {
  con.query(`SELECT * FROM orden_trabajo WHERE orden_trabajo.cliente = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


//JOIN
app.get('/select-cliente-ot/:id' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT idOT, cliente, motocicleta, tipo, DATE_FORMAT(orden_trabajo.fecha_llegada, "%e/%m/%Y") as fecha_llegada, DATE_FORMAT(orden_trabajo.fecha_entrega, "%e/%m/%Y") as fecha_entrega, esPrioridad, motivo_prioridad, dejaMoto, estado, idCliente, nombre, apellido_p, apellido_m, rut, email, dir_calle, dir_num, dir_depto, dir_comuna, dir_pais, telefono, celular FROM orden_trabajo, cliente WHERE orden_trabajo.idOT = ${req.params.id} AND orden_trabajo.cliente=cliente.idCliente;`

  con.query(JOIN_CLIENTE_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/select-ot-cliente/' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT idOT, cliente, motocicleta, tipo, DATE_FORMAT(orden_trabajo.fecha_llegada, "%e/%m/%Y") as fecha_llegada, DATE_FORMAT(orden_trabajo.fecha_entrega, "%e/%m/%Y") as fecha_entrega, esPrioridad, motivo_prioridad, dejaMoto, estado, idCliente, nombre, apellido_p, apellido_m, rut, email, dir_calle, dir_num, dir_depto, dir_comuna, dir_pais, telefono, celular FROM orden_trabajo, cliente WHERE orden_trabajo.cliente=cliente.idCliente;`
  con.query(JOIN_CLIENTE_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


///INSERT
app.post('/add-tipo', bodyParser.json(), (req, res, next) => {
    const INSERT_TIPO_QUERY = `INSERT INTO tipo(nombre_tipo) VALUES('${req.body.nombre_tipo}');`
    con.query(INSERT_TIPO_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('tipo adicionado con éxito')
        }
    })
})

app.post('/add-actividad', bodyParser.json(), (req, res, next) => {
    const INSERT_ACTIVIDAD = `INSERT INTO actividad(nombre_actividad) VALUES('${req.body.nombre_actividad}');`
    con.query(INSERT_ACTIVIDAD, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('actividad adicionado con éxito')
        }
    })
})

app.post('/add-marca', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO marca(nombre_marca) VALUES('${req.body.nombre_marca}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('marca adicionado con éxito')
        }
        console.log(req.body.nombre_marca)
    })
})

app.post('/add-marca-modelo', bodyParser.json(), (req, res, next) => {
    con.query('SELECT COUNT(*) as conteo FROM marca;', (err, resultados) => {
        let n = resultados[0].conteo;
        const INSERT_MODELO = `INSERT INTO modelo(nombre_modelo,marca) VALUES('${req.body.nombre_modelo}', ${n});`
        con.query(INSERT_MODELO, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('marca y modelo adicionado con éxito')
            }
        })
    })
})

app.post('/add-modeloMarca', bodyParser.json(), (req, res, next) => {
    const INSERT_MODELO = `INSERT INTO modelo(nombre_modelo,marca) VALUES('${req.body.nombre_modelo}', ${req.body.marca});`
    con.query(INSERT_MODELO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('modelo adicionado con éxito')
        }
    })
})

app.post('/add-OT', bodyParser.json(), (req, res, next) => {
    con.query('SELECT marca, modelo FROM motocicleta;', (err, resultados) => {
      let motocicleta = resultados[0].marca +' '+resultados[0].modelo;
      var INSERT_OT;
      console.log(req.body.FechaEntrega);

      if(req.body.esPrioridad==0 && req.body.FechaEntrega!=null){
        console.log("sinprioridad");
        INSERT_OT = `INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,fecha_entrega,esPrioridad,dejaMoto,estado)
        VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${motocicleta}', '${req.body.Tipo}', '${req.body.FechaLlegada}', '${req.body.FechaEntrega}', ${req.body.esPrioridad}, ${req.body.dejaMoto}, '${req.body.estado}');`;
        con.query(INSERT_OT, (err, resultados) => {
          if(err) {
              return res.send(err)
          } else {
              return res.send('OT adicionado con éxito')
          }
      })
    }else if(req.body.FechaEntrega==null && req.body.esPrioridad==0){
      INSERT_OT = `INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,esPrioridad,dejaMoto,estado)
      VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${motocicleta}', '${req.body.Tipo}', '${req.body.FechaLlegada}', ${req.body.esPrioridad}, ${req.body.dejaMoto}, '${req.body.estado}');`
      con.query(INSERT_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('OT adicionado con éxito')
        }
      })
    }else if(req.body.FechaEntrega==null && req.body.esPrioridad!=0){
      console.log("conprioridad");
      INSERT_OT = `INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,esPrioridad,motivo_prioridad,dejaMoto,estado)
      VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${motocicleta}', '${req.body.Tipo}', '${req.body.FechaLlegada}', ${req.body.esPrioridad}, '${req.body.Prioridad}', ${req.body.dejaMoto},'${req.body.estado}');`
      con.query(INSERT_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('OT adicionado con éxito')
        }
      })
    }else{
      console.log("conprioridad");
      INSERT_OT = `INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,fecha_entrega,esPrioridad,motivo_prioridad,dejaMoto,estado)
        VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${motocicleta}','${req.body.Tipo}', '${req.body.FechaLlegada}', '${req.body.FechaEntrega}', ${req.body.esPrioridad}, '${req.body.Prioridad}', ${req.body.dejaMoto},'${req.body.estado}');`
        con.query(INSERT_OT, (err, resultados) => {
          if(err) {
            return res.send(err)
          } else {
            return res.send('OT adicionado con éxito');
          }
        })
      }
    })
  })

app.post('/add-marca', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO marca(nombre_marca) VALUES('${req.body.nombre_marca}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('marca adicionado con éxito')
        }
        console.log(req.body.nombre_marca)
    })
})


//UPDATE
app.put('/update-email/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_EMAIL = `UPDATE cliente SET  cliente.email = '${req.body.email}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_EMAIL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('email actualizado con éxito')
        }
    })
});

app.put('/update-telefono/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_TELEFONO = `UPDATE cliente SET  cliente.telefono = '${req.body.telefono}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_TELEFONO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('telefono actualizado con éxito')
        }
    })
});

app.put('/update-celular/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_CELULAR = `UPDATE cliente SET  cliente.celular = '${req.body.celular}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_CELULAR, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('celular actualizado con éxito')
        }
    })
});

app.put('/update-direccion/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_DIRECCION = `UPDATE cliente SET  cliente.dir_calle = '${req.body.calle}', cliente.dir_numero = '${req.body.numero}', cliente.dir_depto = '${req.body.depto}', cliente.dir_comuna = '${req.body.comuna}', cliente.dir_pais = '${req.body.pais}'  WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_DIRECCION, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('direccion actualizado con éxito')
        }
    })
});


//DETALLES DE ACTIVIDADES
app.put('/insert-material/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_MATERIAL = `UPDATE act_OT SET  act_OT.materiales = '${req.body.material}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_MATERIAL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Material actualizado con éxito')
        }
    })
});

app.put('/insert-costo/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_COSTO = `UPDATE act_OT SET  act_OT.costo = '${req.body.costo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Costo actualizado con éxito')
        }
    })
});

app.put('/insert-inicio/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_INICIO = `UPDATE act_OT SET  act_OT.fecha_inicio = '${req.body.inicio}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_INICIO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Fecha Inicio actualizado con éxito')
        }
    })
});

app.put('/insert-fin/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_FIN = `UPDATE act_OT SET  act_OT.fecha_finalizado = '${req.body.fin}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_FIN, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Fecha Fin actualizado con éxito')
        }
    })
});

app.put('/insert-tiempo/:id', bodyParser.json(), (req, res, next) =>
{
    const UPDATE_TIEMPO = `UPDATE act_OT SET  act_OT.tiempo_estimado = '${req.body.tiempo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_TIEMPO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Fecha Fin actualizado con éxito')
        }
    })
});


app.listen(4000, () => {
    console.log('el servidor está usando el puerto 4000 -')
})
