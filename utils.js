const { LotData } = require("./lotdata")

const getLotNums = str => str.split(", ")
    .filter(str => str.length > 0)

const cleanData = (arr) => arr.filter(row => (row[6] && row.length > 6 && row[6] !== "none found" && row[5].length >= 2))

const objectify = (lotNum, rowArr) => new LotData(lotNum, rowArr)

const bundleData = (inHouseArray, thirdPartyArray) => {
    let objArr = []
    inHouseArray.forEach(row => {
        let lotNums = getLotNums(row[6])
            .map(num => objArr.push(objectify(num, row)))
    })
    thirdPartyArray.forEach(row => {
        let lotNums = getLotNums(row[6])
            .map(num => objArr.push(objectify(num, row)))
    })
    return objArr
}

module.exports = {
    cleanData,
    bundleData
}
