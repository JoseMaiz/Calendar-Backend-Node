const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next)=>{

    //* eL token se va a pedir en los x-token (headers)

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is not token in the petition'
        });
    };

    try {

        // * Verificar el token
        const payload = jwt.verify(token,process.env.SECRET_JWT_SEED,);
        
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'It is not a valid token'
        });
    };

    next();
}

module.exports={
    validarJWT,
}