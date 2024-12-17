const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config();
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const database = require("./config/database");
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const systemConfig = require("./config/system");

// goi den ham connect trong config/database.js
database.connect();

const app = express();
const port = process.env.PORT;

// app locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(methodOverride("_method")); // dung de goi den method put, delete trong form

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// define express-flash
app.use(cookieParser("phongcookie"));// do mình tự define
app.use(session({ cookie: {maxAge: 60000}})); // 60000 milis
app.use(flash());

// set up static to access public folder
app.set("views", "./views"); // 2 doan de cau hinh pug trong du an
app.set("view engine", "pug"); //

// set up static file
app.use(express.static("public"));

// Routes
adminRoute(app);
route(app);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`); 
})