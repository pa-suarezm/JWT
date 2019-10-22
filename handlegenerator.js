let jwt = require('jsonwebtoken');
let config = require('./config.js');
let md5 = require('md5');

const MongoClient = require('mongodb').MongoClient;

var conn = MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

//Clase encargada de la creación del token
class HandlerGenerator {

    login(req, res){

        //Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;

        let hash_password = md5(password);

        /*
        //Este usuario y contraseña, en un ambiente real, deben ser traido de la BD
        let mockedUsername = 'admin';
        let mockedPassword = 'password';
        */

        //Si se especificó un usuario contraseña, proceda con la validación
        //de lo contrario, un mensaje de error es retornado
        if(username && password){

            conn.then((client) => {
                client.db("JWT").collection("users").find({"user": username}).toArray((err, data) => {
                    
                    var hash_db_password;

                    if(data[0])
                        hash_db_password = data[0].password;

                    if(hash_password === hash_db_password) {

                        //Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                        let token = jwt.sign({username: username}, config.secret, {expiresIn: '24h'});

                        //Retorna el token el cual debe ser usado durante las siguientes solicitudes
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token,
                            role: data[0].role
                        });

                    }
                    else {

                        //El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                        res.send(403).json({
                            success: false,
                            message: 'Incorrect username or password'
                        });

                    }

                });
            });            
        }
        else {

            //El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });

        }

    }

    index(req, res){

        //Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: 'Index page'
        });

    }

}

module.exports = HandlerGenerator;