const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importando rutas
const empresaRutas = require('./routes/empresas');
const personaRutas = require('./routes/personas');
const { urlencoded } = require('express');


//configuraciones básicas
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middleswares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'membresia'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', empresaRutas);
app.use('/empresas', empresaRutas);
app.use('/personas', personaRutas);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Servidor en ${app.get('port')}`);
});