// target number
// target quote

// create a function that fetch the api and return a response
// create a function that create the quote
// create a function that add the item to session storage
// on load: 
//      if session storage has some data, show it
//      else use the functions to call the api and 
//      create the quote and to add it to session storage

// dice.onClick call the 3 functions

let dice = document.querySelector(".dice")
let adviceContent = document.querySelector(".advice-content")

window.onload = () => {
    data = JSON.parse(sessionStorage.getItem("advice"))
    if (data) {
        createQuote(data)
    } else {
        main()
    }
    dice.classList.add("animation")
}

dice.addEventListener("click", main)

function apiCall(url) {
    return fetch(url)
            .then(response => response.json())
            .then(data => data["slip"])
}

function createQuote(obj) {
    let number = document.querySelector(".advice-number")
    let text = document.querySelector(".advice-text")

    number.textContent = `ADVICE #${obj.id}`
    text.textContent = obj.advice
}

function addToSessionStorage(obj) {
    sessionStorage.setItem("advice", JSON.stringify(obj))
}

function main() {
    let data = apiCall('https://api.adviceslip.com/advice')
    dice.classList.add("animation")
    adviceContent.classList.add("hide")
    return new Promise((resolve, reject) => {
        if (data) {
            resolve(data)
        } else {
            reject(Error("couldn't fetch data"))
        }
    }).then(res => {
        createQuote(res)
        addToSessionStorage(res)
        dice.classList.remove("animation")
        adviceContent.classList.remove("hide")
    })
}
