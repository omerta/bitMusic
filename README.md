# apiExpress
Proyecto en el cual estamos haciendo una api utilizando ExpressJS.

<h1>Tecnologías utilizadas</h1>

<h2>Node.js</h2>

<p> Entorno de ejecución de JavaScript del lado del servidor. </p>

Para saber si tenermos instalado y conocer la versión de node, abrimos la terminal y escribirmos <b>node -v</b>
Si no tenemos Node.js instalado, debemos ir a <b> https://nodejs.org/en/ </b> e instalarlo en nuestro pc.

<h2> NPM </h2>
<p> Es un manejador de paquetes de Node, para conocer la versión instalada, puedes escribir en la terminal <b> npm -v </b></p>

<h2> ExpressJS </h2>
<p> Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles. Puedes ver mas información en: <b>https://expressjs.com/es/</b></p>

<h2> Mongoose </h2>
<p> Módulo de Node la cual nos permitirá conectarnos con MongoDB. <b> https://mongoosejs.com/ </b> </p>

<h2> Postman </h2>
<p> Es la herramienta que estaremos utilizando para probrar nuestra API Rest. <b> https://www.postman.com/ </b> </p>
---

<h1> Instalación </h1>

<ul>
<li> Clona el proyecto en tu pc. </li>
<li> Abre la terminar en la carpeta donde clonaste el proyecto y ejecuta <b>npm install</b>. Con este comando, podemos instalar todos los módulos utilizados en nuestra API. </li>
<li> Abre la terminal y escribe <b>node index.js</b>, con este comando levantamos nuestro servidor, veremos en la terminal los mensajes: <br/> <b>Bien!!!</b> <br/> <b>Escuchando en el puerto => 4200</b> </li>
</ul>

# Endpoints

* GET on root

curl -X GET http://localhost:3000/api

* Create Song

curl -H "Content-Type: application/json" \
 -X POST http://localhost:3000/api/song \
 -d '{ "name": "NameSong", "artist": "ArtistSong", "genre": "GenreSong", "image": "song_image.png", "file": "song_file.ogg" }' | jq