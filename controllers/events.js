const { request, response } = require("express");
const Evento = require("../models/Evento");
const Usuario = require("../models/Usuario");

// ? path: "/api/events" (get)
const getEvents = async(req = request, res = response)=>{

    const eventos = await Evento.find()
                                .populate('user','name')

    res.json({
        ok: true,
        eventos
    })
};

// ? path: "/api/events" (post)
const eventCreate = async(req = request, res = response)=>{

    // Verificar que tenga el evento
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk with the administrator'
        })
    }
};

// ? path: "/api/events" (put)
const eventUptade = async (req = request, res = response)=>{

    const eventId = req.params.id;
    const {uid} = req;

    try {
        
        const evento  = await Evento.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Event don't exist with that id"
            })
        };

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permit for edit this event"
            });
        };

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId,nuevoEvento,{new : true});

        res.json({
            ok:true,
            evento: eventoActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk with the administrator'
        });

    }
};

// ? path: "/api/events" (delete)
const eventDelete = async (req = request, res = response)=>{

    const eventId = req.params.id;
    const {uid} = req;
    
    try {

        const evento  = await Evento.findById(eventId);
    
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Event don't exist with that id"
            })
        };

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permit for delete this event"
            });
        };

        const eventoBorrado = await Evento.findByIdAndDelete(eventId);
        
        res.json({
            ok:true,
            evento_Borrado: eventoBorrado,
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk with the administrator'
        });
    };
};

module.exports = {
    eventCreate,
    eventDelete,
    eventUptade,
    getEvents,
}
