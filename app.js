const express = require('express');
const bodyParser = require('body-parser'); 

const modulesRoutes = require('./routes/modules-routes'); 
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/Modules',modulesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next)=> {
    next(new HttpError('Could not find this route!', 404));
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'});
});

app.listen(5000);