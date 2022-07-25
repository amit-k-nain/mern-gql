const express = require('express');
require('dotenv').config();

// express server
const app = express();

// rest endpoints
app.get('/rest',function(req,res){
    res.json({
        data: "Congrats! You Server is started Sucessfully..!"
    });
});

// port
app.listen(process.env.PORT,function() {
    console.log(`Server is ready at http://localhost:${process.env.PORT}`)
});