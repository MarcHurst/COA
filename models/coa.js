const mongoose = require('mongoose')

const COASchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [] //TODO: Finish category in coa schema 
    },
    strain: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    grownAt: {
        type: String,
        required: true
    },
    batchReleased: {
        type: String,
        default: Date.now,
        required: true
    },
    lotNum: {
        type: String,
        required: true
    },
    confirmation: {
        type: String,
    },
    phytoCannabinoids: {
        d9THC: {
            type: String,
            required: true
        },
        totalTHC: {
            type: String,
            required: true
        },
        THCA: {
            type: String,
            required: true
        },
        CBD: {
            type: String,
            required: true
        },
        totalCBD: {
            type: String,
            required: true,
        },
        CBDA: {
            type: String,
            required: true,
        },
        CBN: {
            type: String,
            required: true
        },
        CBG: {
            type: String,
            required: true
        },
        CBGA: {
            type: String,
            required: true
        },
        CBC: {
            type: String,
            required: true
        }
    },
    totalAerobicBacteria: {
        type: String,
        required: true
    },
    totalYeastMould: {
        type: String,
        required: true
    },
    btgnBacteria: {
        type: String,
        required: true
    },
    salmonellaEcoli: {
        type: String,
        required: true
    },
    paSa: {
        type: String,
        required: true
    },
    pathogens: {
        type: String,
        required: true
    },
    irradiated: {
        type: String,
        required: true
    },
    aflotoxins: {
        type: String,
        required: true
    },
    lossOnDryMoisturePercent: {
        type: String,
        required: true
    },
    pesticides: {
        type: String,
        required: true
    },
    heavyMetals: {
        type: String,
        required: true
    },
    foreignMatter: {
        type: String,
        required: true
    },
    terpenes: {
        totalTerpenes: {
            type: String,
            required: true
        },
        betaMyrcene: {
            type: String,
            required: true
        },
        limonene: {
            type: String,
            required: true
        },
        transCaryophyllene: {
            type: String,
            required: true
        },
        alphaBisabolol: {
            type: String,
            required: true
        },
        alphaHumulene: {
            type: String,
            required: true
        },
        linalool: {
            type: String,
            required: true
        },
        farnesene: {
            type: String,
            required: true
        },
        alphaPinene: {
            type: String,
            required: true
        },
        ocimene: {
            type: String,
            required: true
        },
        transNerolidol: {
            type: String,
            required: true
        },
    },
})

module.exports = mongoose.model('COA', COASchema)