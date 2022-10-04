const mongo = require('mongoose')

function connectDatabase() {
    mongo.connect( process.env.DB_URI ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>console.log('Connected with server :'+data.connection.host)
    )
}

module.exports = connectDatabase