﻿# Pablo Suárez - 201632293
 Instrucciones de despliegue
 <ol>
  <li>En el directorio raiz, correr el comando "npm install"</li>
  <li>En el mismo directorio, correr "mongoimport --db JWT --collection users --file .\poblar_db.json --jsonArray"</li>
  <li>npm start</li>
  <li>Desde Postman hacer una petición de login para conseguir el token con POST a http://localhost:3000/login con alguno de los usuarios declarados en este mismo README con su respectiva contraseña</li>
  <li>Guardar el token y el rol</li>
  <li>Hacer un GET en http://localhost:3000/ pasando por parámetros del Header "Role" con el rol guardado y "Authorization" con el token guardado o con "Bearer " concatenado al token guardado</li>
 </ol>
 <br>
 Usuarios del sistema con sus contraseñas
 <ul>
  <li>admin - password</li>
  <li>usuario - asdf</li>
  <li>publicador - qwerty</li>
 </ul>
