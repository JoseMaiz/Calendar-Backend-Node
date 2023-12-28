const {Schema,model} = require('mongoose')

// *Note: this is the form for work the mongoose's intellinge

/**

*@type {mongoose.SchemaDefinitionProperty}

*/

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes:{
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method('toJSON', function(){
    const {__v,_id, ...object} = this.toObject();

    const newObject = {id:_id, ...object};
    return newObject;
})

module.exports = model('Evento', EventoSchema);