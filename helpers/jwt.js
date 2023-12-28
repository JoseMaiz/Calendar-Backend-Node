const jwt = require('jsonwebtoken');

const generalJWT = (uid, name)=>{

    // *Aqui se hizo uso de la library jsonwebtoken

    return new Promise ((resolve,reject)=>{
        const payload = {uid,name};

        // * Nota: Para poder inavilitar todo JWT creado simplemente se debe cambiar la private key
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '2h'
        }, (err,token)=>{

            if (err) {

                console.log(err);
                reject("It can't general the token");
                
            };

            resolve(token);
        });

    })

}

module.exports = {
    generalJWT,
}
