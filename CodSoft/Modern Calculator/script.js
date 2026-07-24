let display = document.getElementById("display");
let historyBox = document.getElementById("history");
function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteChar() {
    display.value =
        display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        addHistory(expression + " = " + result);
        display.value = result;
    }
    catch {
        display.value = "Error";
    }
}

function addHistory(value) {
    let p = document.createElement("p");
    p.innerHTML = value;
    historyBox.appendChild(p);
    saveHistory(value);
}

function saveHistory(value) {
    let data =
        JSON.parse(localStorage.getItem("history")) || [];
    data.push(value);
    localStorage.setItem(
        "history",
        JSON.stringify(data)
    );
}

function loadHistory() {
    let data =
        JSON.parse(localStorage.getItem("history")) || []
    data.forEach(item => {
        let p = document.createElement("p")
        p.innerHTML = item;
        historyBox.appendChild(p)
    })
}

function clearHistory() {
    localStorage.removeItem("history");
    historyBox.innerHTML = "<h3>History</h3>";
}

// function changeTheme() {
//     document.body.style.background =
//         "linear-gradient(135deg,#000,#434343)"
// }

let isDark = false;

function changeTheme() {
    if (!isDark) {
        document.body.style.background = "linear-gradient(135deg, #000, #000000)";
        document.body.style.color = "white";
        document.querySelector(".theme").textContent = "☀️ Light Theme";
    } else {
        document.body.style.background = "linear-gradient(135deg, #ffffff, #ffffff)";
        document.body.style.color = "black";
        document.querySelector(".theme").textContent = "🌙 Dark Theme";
    }

    isDark = !isDark;
}

document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (
        (key >= "0" && key <= "9") ||
        key == "+" ||
        key == "-" ||
        key == "*" ||
        key == "/" ||
        key == "."
    ) {
        append(key);
    }
    if (key == "Enter") {
        calculate();
    }
    if (key == "Backspace") {
        deleteChar();
    }
    if (key == "Escape") {
        clearDisplay()
    }
})
loadHistory()