const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-statergy');
const passportJWT=require('./config/passport-jwt-statergy');
const passportgoogle=require('./config/passport-google-oauth2-statergy')
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const custommidware=require('./config/middleware');
//set up chat server using socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listning on port 5000');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use('/uploads',express.static(__dirname +'/uploads'))

app.use(expressLayouts);

app.set('layout extractStyles',true);

app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');

app.set('views','./views');


app.use(session({
    name:'coderhub',
    //todo change the secret before deployment
    secret:'somthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 1000)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connect mongodb -ok')
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custommidware.setFlash);
//use express router
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error:${err}`);
    }
    else{
        console.log(`server is running on port:${port}`);
    }
})