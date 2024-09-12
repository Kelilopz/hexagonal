// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes');
const productRouters = require('../../application/routes/productRouters');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');


const createServer = (__dirname) => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    const __dirnames='${__dirname}/application'
    app.use('/css',express.static(path.join(__dirnames,process.env.EXPRESS_STATIC, 'css')))
    app.use('/js',express.static(path.join(__dirnames,process.env.EXPRESS_STATIC, 'js')))   
    app.use('/storage',express.static(path.join(__dirnames,process.env.EXPRESS_STATIC, 'storage')))
    

    app.use('/users', (req,res,next)=>{
        req.__dirname = __dirnames;
        next();
    }, userRoutes);

    app.use('/home',sessionAuth,aut,(req,res,next)=>{
        req.__dirname = __dirnames;
        next();
    },productRoutes)

    app.use('/products', productRouters);

    return app;

    
};

module.exports = createServer;