const jwt = require('jsonwebtoken');

exports.auth=(req,res,next)=>{
    let authHeader = undefined;
    if(req.headers.authorization) authHeader = req.headers.authorization
    if (req.headers.token) authHeader = req.session.token

    const token = authHeader && authHeader.split('')[1];
    if (!token) return res.redirect("/users")

    jwt.verify(token, process.env.JWT_SECRET, (err,payload) =>{
        if(err) return res.redirect("/users")
        console.log(payload)
        next()
    })
}