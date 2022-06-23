document.addEventListener("DOMContentLoaded", async _ => {
    document.querySelector("#searchButton").addEventListener("click", async _ => {
        console.log("Clicked!")
        console.log(isInputValid())
        if (isInputValid()) {
            let targetLot = document.querySelector("#lotNumInput").value
            getLotData(targetLot)
                .then( lotData => {
                    console.log(lotData)
                })
                .catch(err => console.error(err))
        } else {
            document.querySelector("#errorPara").innerText = `Please ensure that your 7 digit lot # is fully included.`
        }
    })
})

const getLotData = async lotNum => {
    const response = await fetch(`https://muskoka-grown-coa.herokuapp.com/api/${lotNum}`)
    const data = await response.json()
    return data 
}

const isInputValid = _ => document.querySelector("#lotNumInput").value.length == 7