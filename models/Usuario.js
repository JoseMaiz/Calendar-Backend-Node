const {Schema,model, models} = require('mongoose')

// *Note: this is the form for work the mongoose's intellinge

/**

*@type {mongoose.SchemaDefinitionProperty}

*/

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);