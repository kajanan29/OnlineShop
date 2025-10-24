const express=require('express');

const db=require('./data/database');

const path=require('path');
const addCsrfTokenMiddleware=require('./middleware/csrf-token');
const errorHandlerMiddleware=require('./middleware/error-handler');

const authRoutes=require('./routes/auth-routes');

const app=express();

const csrf=require('csurf');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(authRoutes);
app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function(){
   app.listen(3000);
}).catch(function(error){
    console.log('falied to connect to the data base');
    console.log(error);
}
);

