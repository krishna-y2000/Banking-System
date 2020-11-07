const express = require('express');
const app = express();
const pageRoute = require('./routes/index');
const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.json() );
app.use(express.urlencoded({extended : false}) )
app.use(express.static(path.join(__dirname , 'public') ) );
app.set('views',path.join(__dirname, 'views') );
app.set('view engine', 'ejs' );
app.use('/',pageRoute);

app.listen(port, (res,req) => {
    console.log("Server is running");
} )