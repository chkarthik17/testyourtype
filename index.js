let speedTypingTestformEl = document.getElementById("speedTypingTestform");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let count = 0;
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let spinnerEl = document.getElementById("spinner");

let intervalId;

function timeStart() {
    intervalId = setInterval(function() {
        count = count + 1;
        timerEl.textContent = count;
        console.log(timerEl.textContent);
    }, 1000);
}



function changeParagraph() {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/random-quote";
    spinnerEl.classList.toggle("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            spinnerEl.classList.toggle("d-none");
            quoteDisplayEl.textContent = data.content;
        });
}
submitBtnEl.onclick = function() {
    let answer = quoteDisplayEl.textContent;
    if (answer === quoteInputEl.value) {
        resultEl.textContent = "Congrats! you typed the correct sentence in " + timerEl.textContent + "seconds";
    } else {
        resultEl.textContent = "Please, try again .You typed incorrect sentence";
    }
    clearInterval(intervalId);
    quoteInputEl.value = "";
}
resetBtnEl.onclick = function() {
    changeParagraph();
    clearInterval(intervalId);
    count = 0;
    timeStart();
    resultEl.textContent = "";
    quoteInputEl.value = "";
}
timeStart();
speedTypingTestformEl.addEventListener("submit", function(event) {
    event.preventDefault();
});
