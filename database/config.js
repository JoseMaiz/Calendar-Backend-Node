const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

        await mongoose.connect(process.env.DB_CNN_MONGO_ATLAS);

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error to the time of initialize the DB');
    }

}

module.exports = {
    dbConnection
}