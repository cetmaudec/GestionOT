
const mysql = require('mysql');
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
  host: "152.74.17.95",
  user: "root",
  password: "2025cetma..",
  database: "rozto_gestion"
});

const app = express()

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors())

//USUARIO
app.get('/auth/:user/:pass' , (req, res, next) => {
    con.query(`SELECT count(idUsuario) as login, idUsuario FROM usuario WHERE usuario.usuario = '${req.params.user}' AND usuario.password = SHA('${req.params.pass}') GROUP BY(idUsuario);`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/auth',  bodyParser.json(), (req, res, next) => {
    const body = req.body;
    const select_query=`SELECT COUNT(*) as total FROM usuario where usuario.usuario='${req.body.username}' AND usuario.password = SHA('${req.body.password}');`
    con.query(select_query, (err, result) => {
     if (err){
           return res.sendStatus(401);
        }else{
            if(result[0].total>0){
                var token = jwt.sign({userID: req.body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                res.send({token});
            }else{
                return res.sendStatus(401);
            }
     }
    });
});


app.get('/users', (req, res) => {
    con.query('SELECT nombreUsuario, email, usuario, question1, DATE_FORMAT(question2, "%Y-%m-%d") as question2, question3 FROM usuario;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/user/add', bodyParser.json(), (req, res, next) => {
    const INSERT_USER_QUERY = `INSERT INTO usuario(nombreUsuario, email, usuario, password, question1, question2, question3) 
    VALUES('${req.body.name}','${req.body.email}','${req.body.user}',SHA('${req.body.password}'), '${req.body.question1}', '${req.body.question2}', '${req.body.question3}');`
    con.query(INSERT_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.sendStatus(401);
        } else {
            return res.send('usuario adicionado con exito')
        }
    })
})

app.get('/user/:username' , (req, res, next) => {
  con.query(`SELECT * FROM usuario WHERE usuario.usuario = ${req.params.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/user/update/pass', bodyParser.json(), (req, res, next) => {
    con.query(`DELETE forgetpass FROM forgetpass WHERE forgetpass.usuario = '${req.body.user}';`, (err, resultados) => {
        con.query(`UPDATE usuario SET usuario.password = SHA('${req.body.password}') WHERE usuario.usuario='${req.body.user}'`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('History adicionado con exito');
            }
        })
    })
})

app.put('/user/delete',bodyParser.json() , (req, res, next) => {
  con.query(`DELETE forgetpass FROM forgetpass WHERE forgetpass.usuario = '${req.body.user}';`, (err, resultados) => {
        con.query(`DELETE usuario FROM usuario WHERE usuario.usuario = '${req.body.user}';`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json({
                    data: resultados
                })
            }
        })

    })
})

//HISTORIAL DE ACCESO
app.post('/history/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO history (usuario, fecha_login)
        VALUES ('${req.body.usuario}', CURRENT_TIMESTAMP());`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('History adicionado con exito');
            }
        })
})

app.put('/history/update/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE history SET history.fecha_logout = CURRENT_TIMESTAMP() WHERE history.idUsuario=${req.params.id}`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('History adicionado con exito');
        }
    })
})



/*
FORGETPASS
*/
app.get('/forgetpass', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT * FROM forgetpass;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/forgetpass/:user', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT forgetpass.usuario, forgetpass.intentos, DATE_FORMAT(forgetpass.fecha_cambio, "%Y-%m-%d") as fecha_cambio FROM forgetpass WHERE forgetpass.usuario='${req.params.user}'`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/forgetpass/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO forgetpass (usuario, intentos, fecha_cambio)
        VALUES ('${req.body.user}', 0, CURRENT_TIMESTAMP());`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Forget Pass adicionado con exito');
        }
    })
})

app.put('/forgetpass/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE forgetpass SET forgetpass.intentos = forgetpass.intentos +1 WHERE forgetpass.usuario='${req.body.user}'`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


/*
CLIENTE
*/

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

app.get('/cliente/:id' , (req, res, next) => {
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

app.post('/cliente/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MODELO = `INSERT INTO cliente (nombre,apellido_p,apellido_m,rut,email,dir_calle,dir_num,dir_depto,dir_comuna,dir_pais,telefono,celular) VALUES ('${req.body.nombre}','${req.body.apellidoPat}','${req.body.apellidoMat}','${req.body.rut}','${req.body.correo}','${req.body.Dir_calle}',${req.body.Dir_numero},${req.body.Dir_depto},'${req.body.Dir_comuna}','${req.body.Dir_pais}','${req.body.Telefono}','${req.body.Celular}');`
    con.query(INSERT_MODELO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('cliente adicionado con exito')
        }
    })
})

app.get('/cliente/comuna/groupby' , (req, res, next) => {
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

app.put('/cliente/email/update/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_EMAIL = `UPDATE cliente SET  cliente.email = '${req.body.email}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_EMAIL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('email actualizado con exito')
        }
    })
});


app.put('/cliente/telefono/update/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_TELEFONO = `UPDATE cliente SET  cliente.telefono = '${req.body.telefono}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_TELEFONO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('telefono actualizado con exito')
        }
    })
});

app.put('/cliente/celular/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_CELULAR = `UPDATE cliente SET  cliente.celular = '${req.body.celular}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_CELULAR, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('celular actualizado con exito')
        }
    })
});

app.put('/cliente/direccion/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_DIRECCION = `UPDATE cliente SET  cliente.dir_calle = '${req.body.calle}', cliente.dir_numero = '${req.body.numero}', cliente.dir_depto = '${req.body.depto}', cliente.dir_comuna = '${req.body.comuna}', cliente.dir_pais = '${req.body.pais}'  WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_DIRECCION, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('direccion actualizado con exito')
        }
    })
});







/*
ACTIVIDAD
*/
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

app.post('/actividad/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_ACTIVIDAD = `INSERT INTO actividad(nombre_actividad) VALUES('${req.body.nombre_actividad}');`
    con.query(INSERT_ACTIVIDAD, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('actividad adicionado con exito')
        }
    })
})



/*
TIPO
*/

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

app.get('/tipo/groupby' , (req, res, next) => {
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

app.post('/tipo/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_TIPO_QUERY = `INSERT INTO tipo(nombre_tipo) VALUES('${req.body.nombre_tipo}');`
    con.query(INSERT_TIPO_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('tipo adicionado con exito')
        }
    })
})


/*
MARCA
*/
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

app.post('/marca/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO marca(nombre_marca) VALUES('${req.body.nombre_marca}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send(true)
        }
    })
})

/*
MOTOCICLETA
*/
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

app.post('/motocicleta/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MARCA = `INSERT INTO motocicleta(marca, modelo) VALUES('${req.body.nombre_marca}', '${req.body.nombre_modelo}');`
    con.query(INSERT_MARCA, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('marca adicionado con exito')
        }
    })
})


app.get('/motocicleta/groupby' , (req, res, next) => {
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

/*
PRIORIDAD
*/
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

app.get('/prioridad/count', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, motivo_prioridad FROM orden_trabajo GROUP BY(motivo_prioridad);', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})



/*
ORDEN DE TRABAJO
*/
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

app.post('/orden-trabajo/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO orden_trabajo (cliente,moto_id, motocicleta, tipo,fecha_llegada,fecha_entrega,esPrioridad,motivo_prioridad,dejaMoto,estado)
        VALUES (${req.body.nombreCliente}, ${req.body.idMotocicleta}, '${req.body.marca} ${req.body.modelo}','${req.body.tipo}', '${req.body.fechaLlegada}', '${req.body.fechaEntrega}', ${req.body.esPrioridad}, '${req.body.prioridad}', ${req.body.dejaMoto},'${req.body.estado}');`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('OT4 adicionado con exito');
            }
        })
})

app.get('/orden-trabajo/dejaMoto/count', (req, res, next) => {
  con.query('SELECT dejaMoto, COUNT(*) as cantidad FROM orden_trabajo GROUP BY(dejaMoto);', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/orden-trabajo/select/:id' , (req, res, next) => {
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

app.get('/orden-trabajo/join/cliente/select/:id' , (req, res, next) => {
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

app.get('/orden-trabajo/join/cliente/orderby/desc' , (req, res, next) => {
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

app.put('/orden-trabajo/estado/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_COSTO = `UPDATE orden_trabajo SET  orden_trabajo.estado = '${req.body.estado}'  WHERE orden_trabajo.idOT=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Estado OT actualizado con exito')
        }
    })
});



/*
ACT_OT
*/
app.get('/act_OT/select/:id' , (req, res, next) => {
  con.query(`SELECT idRelacion, ordenTrabajo, actividad_id, actividad, costo, materiales, DATE_FORMAT(fecha_inicio, "%e/%m/%Y, %k:%i:%s") as fecha_inicio, DATE_FORMAT(fecha_finalizado, "%e/%m/%Y, %k:%i:%s") as fecha_finalizado, tiempo_estimado, tiempo_real FROM act_OT WHERE act_OT.idRelacion= ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/act_OT/select/orden-trabajo/:id' , (req, res, next) => {
  con.query(`SELECT idRelacion, ordenTrabajo, actividad_id, actividad, costo, materiales, DATE_FORMAT(fecha_inicio, "%e/%m/%Y, %k:%i:%s") as fecha_inicio, DATE_FORMAT(fecha_finalizado, "%e/%m/%Y, %k:%i:%s") as fecha_finalizado, tiempo_estimado, tiempo_real, estado FROM act_OT WHERE act_OT.ordenTrabajo = ${req.params.id} ORDER BY(actividad_id) ASC;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/act_OT/insert', bodyParser.json(), (req, res, next) => {
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

///////////////////

app.put('/act_OT/material/insert/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_MATERIAL = `UPDATE act_OT SET  act_OT.materiales = '${req.body.material}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_MATERIAL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Material actualizado con exito')
        }
    })
});

app.put('/act_OT/costo/insert/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_COSTO = `UPDATE act_OT SET  act_OT.costo = '${req.body.costo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Costo actualizado con exito')
        }
    })
});




app.put('/act_OT/inicio/update/:id', bodyParser.json(), (req, res, next) => {
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

app.put('/act_OT/fin/update/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE act_OT SET  act_OT.fecha_finalizado = '${req.body.fin}' WHERE act_OT.idRelacion=${req.params.id} `,
        (err, resultados) => {
        con.query(`UPDATE act_OT SET  act_OT.tiempo_real = FLOOR(HOUR(TIMEDIFF(act_OT.fecha_finalizado, act_OT.fecha_inicio)) / 24)*24+ MOD(HOUR(TIMEDIFF(act_OT.fecha_finalizado, act_OT.fecha_inicio)), 24)+ MINUTE(TIMEDIFF(act_OT.fecha_finalizado, act_OT.fecha_inicio))/60 WHERE act_OT.idRelacion=${req.params.id}`, (err, resultados) => {          
            if(err) {
                return res.send(err)
            } else {
                return res.send('Tiempo Real actualizado con exito')
            }
        })
    })
});

app.put('/act_OT/estado/update/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE act_OT SET act_OT.estado = '${req.body.estado}' WHERE act_OT.idRelacion=${req.params.id} `,
        (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Estado actividad actualizado con exito')
        }
    })
});



app.put('/act_OT/tiempo/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_TIEMPO = `UPDATE act_OT SET  act_OT.tiempo_estimado = '${req.body.tiempo}'  WHERE act_OT.idRelacion=${req.params.id} `
    con.query(UPDATE_TIEMPO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Tiempo estimado actualizado con exito')
        }
    })
});

/*
ESPECIALES
*/

app.get('/pivot-tipo-mes' , (req, res, next) => {
  con.query(`SELECT tipo, 
            COUNT(IF(MONTH(fecha_llegada) = 1, 1, NULL)) AS Enero,
            COUNT(IF(MONTH(fecha_llegada) = 2, 1, NULL)) AS Febrero,
            COUNT(IF(MONTH(fecha_llegada) = 3, 1, NULL)) AS Marzo,
            COUNT(IF(MONTH(fecha_llegada) = 4, 1, NULL)) AS Abril,
            COUNT(IF(MONTH(fecha_llegada) = 5, 1, NULL)) AS Mayo,
            COUNT(IF(MONTH(fecha_llegada) = 6, 1, NULL)) AS Junio,
            COUNT(IF(MONTH(fecha_llegada) = 7, 1, NULL)) AS Julio,
            COUNT(IF(MONTH(fecha_llegada) = 8, 1, NULL)) AS Agosto,
            COUNT(IF(MONTH(fecha_llegada) = 9, 1, NULL)) AS Septiembre,
            COUNT(IF(MONTH(fecha_llegada) = 10, 1, NULL)) AS Octubre,
            COUNT(IF(MONTH(fecha_llegada) = 11, 1, NULL)) AS Noviembre,
            COUNT(IF(MONTH(fecha_llegada) = 12, 1, NULL)) AS Diciembre
            FROM orden_trabajo 
            WHERE YEAR(fecha_llegada) = YEAR(CURDATE()) 
            GROUP BY tipo;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})



app.get('/avg-costo', (req, res, next) => {
  con.query('SELECT AVG(costo) as costo, AVG(tiempo_estimado) as tiempo_estimado, AVG(tiempo_real) as tiempo_real, tipo FROM orden_trabajo, act_OT WHERE orden_trabajo.idOT = act_OT.ordentrabajo GROUP BY(orden_trabajo.tipo);', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/max-demanda', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, MONTH(fecha_llegada) as mes FROM orden_trabajo WHERE YEAR(fecha_llegada) = YEAR(CURDATE())-1 OR YEAR(fecha_llegada) = YEAR(CURDATE()) GROUP BY(MONTH(fecha_llegada)) ORDER BY(cantidad) DESC;', (err, resultados) => {
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

app.listen(4000, () => {
    console.log('el servidor está usando el puerto 4000 -')
})
