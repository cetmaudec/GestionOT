
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

app.get('/anio', (req, res) => {
  con.query('SELECT * FROM anio;', (err, resultados) => {
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

app.post('/add-cliente', bodyParser.json(), (req, res, next) => {
    const INSERT_CLIENTE = `INSERT INTO tipo(nombre, apellido_m, apellido_p, rut, email, dir_calle, dir_num, dir_comuna, dir_pais, telefono, celular) 
    VALUES('${req.body.nombre}','${req.body.apellido_m}','${req.body.apellido_p}','${req.body.rut}','${req.body.email}','${req.body.dir_calle}', ${req.body.dir_num},'${req.comuna}', '${req.body.dir_pais}','${req.body.telefono}','${req.body.celular}' );`
    con.query(INSERT_CLIENTE, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('cliente adicionado con éxito')
        }
    })
})



app.listen(4000, () => {
    console.log('el servidor está usando el puerto 4000')
})
