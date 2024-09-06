// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes');
const productRouters = require('../../application/routes/productRouters');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use('/products', productRouters)
    
    app.use('/users',  userRoutes);
    return app;

    
};

    


module.exports = createServer;