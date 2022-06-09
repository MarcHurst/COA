const getLotNums = str => str.split(", ")
    .filter(str => str.length > 0)

module.exports = {
    getLotNums
}