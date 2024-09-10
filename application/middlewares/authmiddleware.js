const jwt = require('jsonwebtoken');

exports.authenticateToken =(req,res,next) => {
    const authleader = req.headers['authorization'];
    const token = authleader && authleader.split('')[1];

    if (!token) return res.status(401).json({message:'Token required'});
    console.log("verific");

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err) return res.status(403).json({message:'Token invalid'});
        console.log(payload);
        req.user = user;
        next();
    });
}