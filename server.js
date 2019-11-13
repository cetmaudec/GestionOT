
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
    con.query('SELECT * FROM cliente ORDER BY(idCliente) DESC;', (err, resultados) => {
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

app.get('/last-orden-trabajo', (req, res) => {
  con.query('SELECT MAX(idOT) as last FROM orden_trabajo;', (err, resultados) => {
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
  con.query(`SELECT idRelacion, ordenTrabajo, actividad_id, actividad, costo, materiales, DATE_FORMAT(fecha_inicio, "%e/%m/%Y") as fecha_inicio, DATE_FORMAT(fecha_finalizado, "%e/%m/%Y") as fecha_finalizado, tiempo_estimado, tiempo_real, estado FROM act_OT WHERE act_OT.ordenTrabajo = ${req.params.id} ORDER BY(actividad_id) ASC;`, (err, resultados) => {
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
    const JOIN_CLIENTE_OT = `SELECT idOT, cliente, motocicleta, tipo, DATE_FORMAT(orden_trabajo.fecha_llegada, "%e/%m/%Y") as fecha_llegada, DATE_FORMAT(orden_trabajo.fecha_entrega, "%e/%m/%Y") as fecha_entrega, esPrioridad, motivo_prioridad, dejaMoto, estado, idCliente, nombre, apellido_p, apellido_m, rut, email, dir_calle, dir_num, dir_depto, dir_comuna, dir_pais, telefono, celular FROM orden_trabajo, cliente WHERE orden_trabajo.cliente=cliente.idCliente ORDER BY(idOT) DESC;`
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

app.get('/group-actividad-ot/' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT act_OT.ordenTrabajo AS ordenTrabajo,
    orden_trabajo.estado AS estadoOT,
    cliente.nombre AS nombre,
    cliente.apellido_p AS apellido_p,
    cliente.apellido_m AS apellido_m,
    COUNT(CASE WHEN act_OT.estado = 'Iniciada' THEN 1 END) AS iniciada,
    COUNT(CASE WHEN act_OT.estado = 'Finalizada' THEN 1 END) AS finalizada,
    COUNT(CASE WHEN act_OT.estado = 'Aplica' THEN 1 END) AS app,
    COUNT(CASE WHEN act_OT.estado = 'No aplica' THEN 1 END) AS na
    FROM act_OT, orden_trabajo, cliente
    WHERE cliente.idCliente=orden_trabajo.cliente AND act_OT.ordenTrabajo=orden_trabajo.idOT  GROUP BY(act_OT.ordenTrabajo);`
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


//SELECT COUNT


app.get('/group-moto' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT count(*) as cantidad, motocicleta FROM orden_trabajo GROUP BY(motocicleta) ORDER BY(cantidad) DESC;`
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

app.get('/group-tipo' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT count(*) as cantidad, tipo FROM orden_trabajo GROUP BY(tipo) ORDER BY(cantidad) DESC;`
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

app.get('/group-comuna' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT count(*) as cantidad, cliente.dir_comuna as comuna FROM orden_trabajo, cliente WHERE orden_trabajo.cliente = cliente.idCliente GROUP BY(cliente.dir_comuna) ORDER BY(cantidad) DESC;`
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
            return res.send('tipo adicionado con exito')
        }
    })
})

app.post('/add-actividad', bodyParser.json(), (req, res, next) => {
    const INSERT_ACTIVIDAD = `INSERT INTO actividad(nombre_actividad) VALUES('${req.body.nombre_actividad}');`
    con.query(INSERT_ACTIVIDAD, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('actividad adicionado con exito')
        }
    })
})



app.post('/add-actividadOT', bodyParser.json(), (req, res, next) => {
    con.query('SELECT MAX(idOT) as last FROM orden_trabajo;', (err, resultados) => {
        let n = resultados[0].last;
        con.query(`INSERT INTO act_OT(ordenTrabajo,actividad_id,actividad) VALUES(${n},'${req.body.id}','${req.body.nombre}');`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('actividad adicionado con exito')
            }
        })
    })
})

app.post('/add-marca', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO marca(nombre_marca) VALUES('${req.body.nombre_marca}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('marca adicionado con exito')
        }
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
                return res.send('marca y modelo adicionado con exito')
            }
        })
    })
})

app.post('/add-cliente', bodyParser.json(), (req, res, next) => {
    const INSERT_MODELO = `INSERT INTO cliente (nombre,apellido_p,apellido_m,rut,email,dir_calle,dir_num,dir_depto,dir_comuna,dir_pais,telefono,celular) VALUES ('${req.body.nombre}','${req.body.apellidoPat}','${req.body.apellidoMat}','${req.body.rut}','${req.body.correo}','${req.body.Dir_calle}',${req.body.Dir_numero},${req.body.Dir_depto},'${req.body.Dir_comuna}','${req.body.Dir_pais}','${req.body.Telefono}','${req.body.Celular}');`
    con.query(INSERT_MODELO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('cliente adicionado con exito')
        }
    })
})

app.post('/add-OT', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,fecha_entrega,esPrioridad,motivo_prioridad,dejaMoto,estado)
        VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${req.body.marca} ${req.body.modelo}','${req.body.tipo}', '${req.body.fechaLlegada}', '${req.body.fechaEntrega}', ${req.body.esPrioridad}, '${req.body.prioridad}', ${req.body.dejaMoto},'${req.body.estado}');`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('OT4 adicionado con exito');
            }
        })
})

app.post('/add-marca', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO marca(nombre_marca) VALUES('${req.body.nombre_marca}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('marca adicionado con exito')
        }
    })
})

//UPDATE
app.put('/update-email/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_EMAIL = `UPDATE cliente SET  cliente.email = '${req.body.email}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_EMAIL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('email actualizado con exito')
        }
    })
});

app.put('/update-telefono/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_TELEFONO = `UPDATE cliente SET  cliente.telefono = '${req.body.telefono}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_TELEFONO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('telefono actualizado con exito')
        }
    })
});

app.put('/update-celular/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_CELULAR = `UPDATE cliente SET  cliente.celular = '${req.body.celular}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_CELULAR, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('celular actualizado con exito')
        }
    })
});

app.put('/update-direccion/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_DIRECCION = `UPDATE cliente SET  cliente.dir_calle = '${req.body.calle}', cliente.dir_numero = '${req.body.numero}', cliente.dir_depto = '${req.body.depto}', cliente.dir_comuna = '${req.body.comuna}', cliente.dir_pais = '${req.body.pais}'  WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_DIRECCION, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('direccion actualizado con exito')
        }
    })
});


//DETALLES DE ACTIVIDADES
app.put('/insert-material/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_MATERIAL = `UPDATE act_OT SET  act_OT.materiales = '${req.body.material}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_MATERIAL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Material actualizado con exito')
        }
    })
});

app.put('/insert-costo/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_COSTO = `UPDATE act_OT SET  act_OT.costo = '${req.body.costo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Costo actualizado con exito')
        }
    })
});


app.put('/end-estadoOT/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_COSTO = `UPDATE orden_trabajo SET  orden_trabajo.estado = '${req.body.estado}'  WHERE orden_trabajo.idOT=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Estado OT actualizado con exito')
        }
    })
});


app.put('/insert-inicio/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE act_OT SET  act_OT.fecha_inicio = '${req.body.inicio}' WHERE act_OT.idRelacion=${req.params.id}`,
        (err, resultados) => {
        con.query(`UPDATE orden_trabajo  INNER JOIN act_OT ON orden_trabajo.idOT = act_OT.ordenTrabajo
            SET orden_trabajo.estado = "En ejecución"  WHERE act_OT.idRelacion = ${req.params.id};`,
            (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('Cambio de estado actualizado con exito')
            }
        })
    })
});

app.put('/insert-fin/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE act_OT SET  act_OT.fecha_finalizado = '${req.body.fin}' WHERE act_OT.idRelacion=${req.params.id} `,
        (err, resultados) => {
        con.query(`UPDATE act_OT SET  act_OT.tiempo_real =  DATEDIFF(act_OT.fecha_finalizado, act_OT.fecha_inicio) WHERE act_OT.idRelacion=${req.params.id}`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('Tiempo Real actualizado con exito')
            }
        })
    })
});

app.put('/estado-actividad/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE act_OT SET act_OT.estado = '${req.body.estado}' WHERE act_OT.idRelacion=${req.params.id} `,
        (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Tiempo Real actualizado con exito')
        }
    })
});



app.put('/insert-tiempo/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_TIEMPO = `UPDATE act_OT SET  act_OT.tiempo_estimado = '${req.body.tiempo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_TIEMPO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Tiempo estimado actualizado con exito')
        }
    })
});

app.listen(4000, () => {
    console.log('el servidor está usando el puerto 4000 -')
})
