const { request, response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generalJWT } = require("../helpers/jwt");

// ? path: "/api/auth/new"
const userCreate = async (req = request ,res = response)=>{

    const {email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'The user already exist'
            });
        };

        
        usuario = new Usuario(req.body);
        
        // *Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        usuario.password = hash;

        await usuario.save()
        
        // *General JWT
        const token = await generalJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk with administrator'
        });

    }


};

// ? path: "/api/auth"
const userLogin = async(req = request ,res = response)=>{

    const {email, password} = req.body;

    try {
        
        // *Verificar que el ususario exista
        const usuario = await Usuario.findOne({email});
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "The user don't exist with that email"
            });
        };

        // * confirmar el password 
        
        const validPassword =bcrypt.compareSync( password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Wrong password"
            });
        };

        // * General el JWT
        const token = await generalJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk with administrator'
        });
    };
};

// ? path: "/api/auth/renew"
const tokenRevalidate = async (req = request ,res = response)=>{
    
    const uid = req.uid;
    const name = req.name;

    // * General un nuevo JWT
    token = await generalJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}
module.exports = {
    userCreate,
    userLogin,
    tokenRevalidate,
};