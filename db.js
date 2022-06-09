const {MongoClient} = require('mongodb')
const connectionStr = process.env.DBSTRING

const client = new MongoClient(connectionStr)