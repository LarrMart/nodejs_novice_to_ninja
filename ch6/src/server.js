import express from 'express';
import url from 'url';
import path from 'path';

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url)) + path.sep;

const cfg = {
	PORT: process.env.PORT || 3000,
	dir: {
		views: __dirname + "views" + path.sep,
		static: __dirname + "static" + path.sep
	}
}

app.set("view engine", "ejs");
app.set("views", cfg.dir.views);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/form", (req, res) => {
	res.render('form');
});

app.post("/process-form", (req, res) => {
	console.log(req.body);
})

app.listen(cfg.PORT, () => console.log(`Server online on port ${cfg.PORT}`));