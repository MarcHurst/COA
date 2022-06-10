require('dotenv').config()
const PORT = process.env.PORT || 3000

const MongoClient = require('mongodb').MongoClient
const express = require('express')
const {google} = require('googleapis')
const {GoogleAuth} = require('google-auth-library')
const LD = require('./lotdata')
const utils = require('./utils')
//const {LotData} = require('./lotdata')
let LotData = LD.LotData

const ssid = process.env.SSID
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

const app = express()
let db,
    dbConnectionStr = process.env.DBSTRING,
    dbName = 'muskokagrown'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} on MongoDB`)
        db = client.db(dbName)
    })
    .catch(err => console.error(`Error connecting to MongoDB: ${err}`))

const getLotNums = str => str.split(", ")
    .filter(str => str.length > 0)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    
})

app.get('/refresh', async (req, res) => {
    const auth = new GoogleAuth({
        keyFile: "./credentials.json",
        scopes: SCOPES
    })

    const client = await auth.getClient()
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.SSID,
        range: "Final"
    })

    const getThirdPartyRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.SSID,
        range: "Third Party"
    })

    const data = getRows.data.values.slice(5)
    let cleanData = data.filter(row => (row[6] && row.length > 6 && row[6] !== "none found"))

    let cleanThirdPartyData = getThirdPartyRows.data.values.slice(5)
        .filter(row => (row[6] && row.length > 6 && row[6] !== "none found"))
    
    console.log(cleanData.length+cleanThirdPartyData.length, "rows found")
    let objArr = []
    cleanData.forEach(row => {
        let lotNums = getLotNums(row[6])
            .map(num => objArr.push(new LotData(num, row)))
        // console.log(lotNums)
    })

    cleanThirdPartyData.forEach(row => {
        let lotNums = getLotNums(row[6])
            .map(num => objArr.push(new LotData(num, row)))
    // console.log(lotNums)
    })
    // Purge the DB
    db.collection('COA').remove({})

    // Rebuild the DB
    objArr.forEach(lotData => {
        db.collection('COA')
            .insertOne(lotData)
        .then(res => {
            console.log(`${lotData.lotNum} successfully added`)
        })
        .catch(err => console.error(err))
    })
    res.json(`${objArr.length} entries added to MongoDB.`)
})

app.get('/api/:targetLotNum', async (req, res) => {
    db.collection('COA').findOne({lotNum: req.params.targetLotNum})
    .then(data => {
        console.log(data)
        if (data) {
            res.json(data)
        } else {
            res.json({result: "0 records found"})
        }
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT, _ => console.log(`Listening on port ${process.env.PORT}!`))