const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const path = require('path')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const {google} = require('googleapis')
const {GoogleAuth} = require('google-auth-library')
const {cleanData, bundleData} = require('./utils')
const connectDB = require('./config/db')

const COA = require('./models/coa')
connectDB()

const ssid = process.env.SSID
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send("All good in the hood.  But you shouldn't be using this route.")
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
        spreadsheetId: ssid, 
        range: "Final"
    })

    const getThirdPartyRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ssid,
        range: "Third Party"
    })

    const refactorData = cleanData(getRows.data.values.slice(5))
    const refactorThirdData = cleanData(getThirdPartyRows.data.values.slice(5))
    const refactorObjArr = bundleData(refactorData, refactorThirdData)

    // Build the DB
    refactorObjArr.forEach(async lotData => {
        try {
            await COA.create(lotData)
        } catch (err) {
            console.error(err)
            console.log(lotData)
        }
    })
    res.send(`${refactorObjArr.length} entries added to MongoDB.`)
})

app.get('/api/:targetLotNum', async (req, res) => {
    try {
        console.log(req.params)
        let targetLotNum = req.params.targetLotNum.toString()
        console.log("Target lot number:", targetLotNum)
        let lotData = await COA.findOne({lotNum: req.params.targetLotNum}).lean()
        console.log(lotData)
        res.json(lotData)
    } catch (err) {
        console.error(err)
    }
})

app.get('/coa/:targetLotNum', async (req, res) => {

})

app.listen(PORT, _ => console.log(`Listening on port ${PORT}!`))