document.addEventListener("DOMContentLoaded", _ => {
    document.querySelector("#searchButton").addEventListener("click", async _ => {
        console.log("Clicked!")
        console.log(isInputValid())
        if (isInputValid()) {
            let response = await fetch(`https://muskoka-grown-coa.herokuapp.com/api/${document.querySelector("#lotNumInput").value}`, {
                mode: 'no-cors',
                method: "GET",
                
                // headers: {
                //     "Content-Type": "application/json"
                // }
            })
            let data = await response.json()
            console.log(data)
        } else {
            document.querySelector("#errorPara").innerText = `Please ensure that your 7 digit lot # is fully included.`
        }
    })
})

const isInputValid = _ => document.querySelector("#lotNumInput").value.length == 7