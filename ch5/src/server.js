import express from 'express';
import url from 'url';
import path from 'path';
import compression from 'compression' // Comprime los activos que se le envíen al cliente

// La importación con ES6 desconoce la variable __dirname que se obtenía con require()
// así que hay "fabricarla"

// 1. import.meta.url tiene la URL de archivo (file:///) del archivo que importa 
// el módulo url 
// en este caso es: file:///C:/Users/Guillermo/Desktop/practicas/nodejs_novice_to_ninja/ch5/src/server.js
//console.log(import.meta.url)


// 2. fileURLToPath() quita el protocolo dejando la ruta absoluta del archivo y además
// dependiendo el sistema operativo que se use, modifica los separadores
// C:\Users\Guillermo\Desktop\practicas\nodejs_novice_to_ninja\ch5\src\server.js
//console.log(url.fileURLToPath(import.meta.url))

// 3. Luego con dirname se obtiene la ruta absoluta a la que pertenece el archivo
// y se lo quita del string y con sep se agrega un separador
//console.log(path.dirname(url.fileURLToPath(import.meta.url)) + path.sep);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url)) + path.sep;

const cfg = {
	port: process.env.PORT || 3000,
	dir: {
		root: __dirname,
		static: __dirname + 'static' + path.sep,
		views: __dirname + 'views' + path.sep
	}
};

const app = express();
app.use(compression());      // Se debe utilizar el middleware antes de las rutas
app.disable('x-powered-by'); // Sirve para deshabilitar este mensaje que va en las cabeceras
							 // que le da información a los hackers de que estamos trabajando con express

app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/hello/', (req, res) => {
	res.send('Hello again!');
});

app.get(/dummy-pag[abced]+/, (req, res) => res.render("dummy-page", { //Se soportan expresiones regulares
	title: "Dummy page",                                               // pero las URLs no funcionan con acentos 
	text: "Dummy text"
}))

app.use(express.static(cfg.dir.static));
app.set('pretty', 'false');

console.log(app.locals);


app.listen(cfg.port, () => {
	console.log(`Server online on port: ${ cfg.port }`);
});