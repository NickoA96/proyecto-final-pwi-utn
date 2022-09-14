const express = require('express');
require ('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');


const app = express();
const PORT = process.env.PORT || 8080;



// Conexion a base de Datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


// conexion.connect((err) => {
//     if (err) {
//         console.error(`Error en la conexión: ${err.stack}`)
//         return;
//     }
//     // console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
// });



 

//Configurar Middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));



//Configuración del Motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));



app.get('/', (req, res, next) => {
    res.render('ind',  {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/somos', (req, res, next) => {
    res.render('somos', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/socios', (req, res, next) => {
    res.render('socios', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});

app.get('/registrados', (req, res, next) => {
    
    let sql = 'SELECT * FROM in7v2p9gh76lvzf1.socios ';

    conexion.query(sql,  (err, result) => {
        if (err) throw err;
        res.render('registrados', {
            style: 'stylo.css',
            result: result,
        });
    });
});

app.get('/cam_fut', (req, res, next) => {
    res.render('cam_fut', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});

app.get('/sucursal', (req, res, next) => {
    res.render('sucursal', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});


app.get('/shorts_fut', (req, res, next) => {
    res.render('shorts_fut', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/medi_fut', (req, res, next) => {
    res.render('medi_fut', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/edlim_fut', (req, res, next) => {
    res.render('edlim_fut', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/cam_bkt', (req, res, next) => {
    res.render('cam_bkt', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/shorts_bkt', (req, res, next) => {
    res.render('shorts_bkt', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/tlibre_bkt', (req, res, next) => {
    res.render('tlibre_bkt', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/cfut_1', (req, res, next) => {
    res.render('cfut_1', {
        style: 'stylo.css',
        icon: 'favicon.ico',
        js: 'inj.js'
    })
});
app.get('/cfut_2', (req, res, next) => {
    res.render('cfut_2', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
});
app.get('/cfut_3', (req, res, next) => {
    res.render('cfut_3', {
        style: 'stylo.css',
        icon: 'favicon.ico',
    })
}),




app.post('/ind', (req, res, next) => {
    const {email} = req.body;
    let fecha = new Date()

    
    
    if (email == '') {
        let validacion ='Rellene la Suscripción correctamente..'
        res.render('ind', {
            style: 'stylo.css',
            icon: 'favicon.ico',
            validacion
        });
    } else{
        
        

        async function envioMail(){
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.PASS_MAIL
                }
            });

            let envio= await transporter.sendMail({
                from: process.env.USER_MAIL,
                to:`${email}`,
                subject: 'Gracias por suscribirse a las novedades de nuestra BOCA Shop',
                html: `Hola somos BOCA Shop y te agradecemos por  haberte suscrito a la Pagina de Boca, te estaremos manteniendo al dia con nuestras novedades. <br>
                Gracias por tu interés.<br>
                Atte. BOCA Shop.<br>
                ${fecha}`
            });

        
            let enviado ='Gracias por suscribirse a BOCA Shop'
            res.render('ind', {
                style: 'stylo.css',
                icon: 'favicon.ico',
                enviado 

            })
        }
            envioMail();
        }
    } );


    



    

    app.post('/socios', (req, res, next) => {
        
        const {nombre, apellido, dni, celular, provincia, ciudad, cp, pais, email} = req.body;
    
        conexion.query('INSERT INTO in7v2p9gh76lvzf1.socios SET ?', {nombre, apellido, dni, celular, email, provincia, ciudad, cp, pais}, 
        (error, results) => {
                if (nombre == '' || apellido == '' || dni == '' || celular == ''|| email == '' || provincia == '' || ciudad == '' || cp == '' || pais == ''){ 
                    let validacion2  = 'Rellene los campos obligatorios (*)';
                    
                res.render('socios', {
                    style: 'stylo.css',
                    validacion2
                })
            }else{




                
                async function envioMail2(){
                    let transporter2 = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.USER_MAIL,
                            pass: process.env.PASS_MAIL
                        }
                    });
        
                    let envio= await transporter2.sendMail({
                        from: process.env.USER_MAIL,
                        to:`${email}`,
                        subject: 'Gracias por sumarte a los socios de  BOCA Shop',
                        html: `Bienvenido y  muchas gracias por sumarte como socio, con lo cual obtendras grandes beneficios. <br>
                        Gracias por tu interés.<br>
                        Atte. BOCA Shop.<br>
                        `
                    });


                    
                let confirmacion2 = 'Socio agregado correctamente..';
                res.render('socios', {
                    style: 'stylo.css',
                    confirmacion2
                })
            }
                envioMail2();
            }
        });
    });
    
    

app.listen(PORT, () => {
    // console.log(`El servidor está trabajando en el Puerto ${PORT}`);
});


