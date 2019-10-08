
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

//COUNT

app.get('/count-marca', (req, res) => {
  con.query('SELECT COUNT(*) as count FROM marca;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

//
app.get('/select-cliente/?:id', (req, res) => {
  con.query('SELECT * FROM cliente WHERE cliente.idCliente = ${id};', (err, resultados) => {
        console.log(resultados);
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/select-cliente', bodyParser.json(), (req, res, next) => {
    const SELECT_CLIENTE = `SELECT * FROM cliente WHERE cliente.idCliente = ${req.body.id};`
    con.query(INSERT_TIPO_QUERY, (err, resultados) => {
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
            return res.send('actividad adicionado con éxito')
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
                return res.send('actividad adicionado con éxito')
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
            return res.send('actividad adicionado con éxito')
        }
    })
})

app.listen(4000, () => {
    console.log('el servidor está usando el puerto 4000')
})
