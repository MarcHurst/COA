class LotData {
    constructor(lotNum, arr) {
        this.date = arr[0]
        this.category = arr[1]
        this.strain = arr[2]
        this.batch = arr[3]
        this.grownAt = arr[4]
        this.batchReleased = arr[5]
        this.lotNum = lotNum
        this.confirmation = arr[7]
        this.phytocannabinoids = {
            d9THC: arr[8],
            totalTHC: arr[9],
            THCA: arr[10],
            CBD: arr[11],
            totalCBD: arr[12],
            CBDA: arr[13],
            CBN: arr[14],
            CBG: arr[15],
            CBGA: arr[16],
            CBC: arr[17]
        }
        this.totalAerobicBacteria = arr[18]
        this.totalYeastMould = arr[19]
        this.btgnBacteria = arr[20]
        this.salmonellaEcoli = arr[21]
        this.paSa = arr[22]
        this.pathogens = arr[23]
        this.irradiated = arr[24]
        this.aflotoxins = arr[25]
        this.lossOnDryMoisturePercent = arr[26]
        this.pesticides = arr[27]
        this.heavyMetals = arr[28]
        this.foreignMatter = arr[29]
        this.terpenes = {
            totalTerpenes: arr[30],
            betaMyrcene: arr[31],
            limonene: arr[32],
            transCaryophyllene: arr[33],
            alphaBisabolol: arr[34],
            alphaHumulene: arr[35],
            linalool: arr[36],
            farnesene: arr[37],
            alphaPinene: arr[38],
            ocimene: arr[39],
            transNerolidol: arr[40]
        }
        // Expected last array index to be [40]
    }
}

let headings =  [
    "Date Results Received",
    "Product Category (Ex: Dried Cannabis, Milled Product for Pre-Rolls)",
    "Strain Name",
    "Batch #",
    "Grown At ",
    "Batch Released ",
    "Lot #",
    "Confirmation sent to IT",
    "Δ9-THC",
    "Total THC",
    "THCA",
    "CBD",
    "Total CBD",
    "CBDA",
    "CBN",
    "CBG",
    "CBGA",
    "CBC",
    "Total Aerobic Bacteria",
    "Total Yeast and Mould",
    "BTGN Bacteria",
    "Salmonella/Ecoli",
    "PA/SA",
    "Pathogens Present (Yes/ No)",
    "Batch Irradiated",
    "Aflotoxins",
    "LOD - Moisture Content (%)",
    "Pesticides",
    "Heavy Metals",
    "Foreign Matter",
    "Total Terpenes (%)",
    "Beta- Myrcene",
    "Limonene",
    "Trans-Caryophyllene ",
    "Alpha-Bisabolol",
    "Alpha- Humulene ",
    "Linalool ",
    "Farnesene ",
    "Alpha-Pinene",
    "Ocimene ",
    "Trans-Nerolidol"
]

module.exports = {
    LotData: LotData
}