const express=require('express');
const app=express();
const port=8000;

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