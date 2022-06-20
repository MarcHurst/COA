document.addEventListener("DOMContentLoaded", _ => {
    document.querySelector("#searchButton").addEventListener("click", async _ => {
        console.log("Clicked!")
        console.log(isInputValid())
        if (isInputValid()) {
            let response = await fetch(`https://muskoka-grown-coa.herokuapp.com/api/${document.querySelector("#lotNumInput").value}`)
            let data = await response.json()
            console.log(data)
        } else {

        }
    })
})

const isInputValid = _ => document.querySelector("#lotNumInput").value.length == 7