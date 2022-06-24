document.addEventListener("DOMContentLoaded", async _ => {
    document.querySelector("#searchButton").addEventListener("click", async _ => {
        if (isInputValid()) {
            showErrorText("")
            let targetLot = document.querySelector("#lotNumInput").value
            getLotData(targetLot)
                .then( lotData => {
                    receiveData(lotData)
                })
                .catch(err => console.error(err))
        } else {
            showErrorText(`Please ensure that your 7 digit lot # is fully included.`)
        }
    })
})

const getLotData = async lotNum => {
    const response = await fetch(`https://muskoka-grown-coa.herokuapp.com/api/${lotNum}`)
    const data = await response.json()
    return data 
}

const isInputValid = _ => document.querySelector("#lotNumInput").value.length == 7

const hideCOAData = _ => document.querySelector("#coaResultsSection").classList.add("hidden") 

const showCOAData = _ => document.querySelector("#coaResultsSection").classList.remove("hidden")

const populateCOAData = data => {
    console.log(`Data provided:`, data)
    document.querySelector("#targetStrain").innerText = data.strain
    document.querySelector("#targetTerps").innerText = data.terpenes.totalTerpenes
    document.querySelector("#targetTHC").innerText = data.phytocannabinoids.totalTHC
    document.querySelector("#targetCBD").innerText = data.phytocannabinoids.totalCBD
    document.querySelector("#targetURL").href = `https://muskoka-grown-coa.herokuapp.com/coa/1542101`
    showCOAData()
}

const showErrorText = err => {
    document.querySelector("#errorPara").innerText = err
}

const receiveData = data => {
    if (data === null) {
        showErrorText("Invalid Lot Number.  No lots prior to 2022 are included in these records.  Please contact us if you can't find your info.")
        hideCOAData
    } else {
        showErrorText("")
        populateCOAData(data)
    }
}