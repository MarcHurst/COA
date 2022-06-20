const MongoClient = require('mongodb').MongoClient
const connectionStr = process.env.DBSTRING
const dbName = "muskokagrown"

// const client = new MongoClient(connectionStr)

const getDB = _ => {
    MongoClient.connect(connectionStr, {useUnifiedTopology: true})
        .then(client => {
            console.log(`Connected to ${dbName} on MongoDB`)
            return client.db(dbName)
        })
        .catch(err => console.error(`Error connecting to MongoDB: ${err}`))
}
    
module.exports = {
    getDB
}
