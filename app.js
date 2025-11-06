const express=require('express');

const db=require('./data/database');

const path=require('path');
const addCsrfTokenMiddleware=require('./middleware/csrf-token');
const errorHandlerMiddleware=require('./middleware/error-handler');
const checkAuthStatusMiddleware=require('./middleware/check-auth');

const authRoutes=require('./routes/auth-routes');
const baseRoutes=require('./routes/base-routes');
const productsRoutes=require('./routes/products-routes');
const adminRoutes=require('./routes/admin-routes');

const app=express();

const csrf=require('csurf');
const expressSession=require('express-session');
const createSessionConfig=require('./config/session');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

const sessionConfig=createSessionConfig();
app.use(expressSession(sessionConfig));
app.use((req, res, next) => {
  res.locals.isAuth = req.session ? req.session.isAuth : false;
  next();
});




app.use(express.urlencoded({extended:false}));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);


app.use(authRoutes);
app.use(baseRoutes);
app.use(productsRoutes);
app.use('/admin',adminRoutes);
app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function(){
   app.listen(3000);
}).catch(function(error){
    console.log('falied to connect to the data base');
    console.log(error);
}
);

