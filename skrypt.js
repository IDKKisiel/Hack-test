let currentStep = 0;
const totalSteps = 5;
let dzialaniaList = [];
let hakowanieZakonczone = false;

function ladowanie() {
    const bar = document.getElementById('loading-bar');
    let width = 100;

    bar.style.width = '100%';
    bar.style.transition = 'width 0.05s linear';

    const interval = setInterval(() => {
        if (width <= 0) {
            clearInterval(interval);
            startHakowania();
        } else {
            width--;
            bar.style.width = width + '%';
        }
    }, 30); 
}

function ladowanie2() {
    const bar = document.getElementById('loading-bar');
    let width = 100;

    bar.style.width = '100%';
    bar.style.transition = 'width 0.05s linear';

    const interval = setInterval(() => {
        if (width <= 0) {
            clearInterval(interval);
            wyswietlStart();
        } else {
            width--;
            bar.style.width = width + '%';
        }
    }, 30); 
}

function showDiv() {
    const elements = document.getElementsByClassName('asd');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "block"; 
    }
}

function hideDiv() {
    const elements = document.getElementsByClassName('asdd');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function startHack() {
    showDiv(); 
    hideDiv(); 
    ladowanie(); 
}

function losoweDzialanie() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const operacje = ["+", "-", "*", "/"];
    const operator = operacje[Math.floor(Math.random() * operacje.length)];

    let wynik;
    let dzialanieStr;

    if(operator === "/") {
        wynik = Math.floor(a / b);
        dzialanieStr = `${a * b} / ${b}`;
    } else if(operator === "-") {
        if(a < b){
            dzialanieStr = `${b} - ${a}`;
        } else {
            dzialanieStr = `${a} - ${b}`;
        }
    } else {
        dzialanieStr = `${a} ${operator} ${b}`;
    }

    return dzialanieStr;
}

function obliczWynik(dzialanie) {
    const parts = dzialanie.split(" ");
    const a = Number(parts[0]);
    const operator = parts[1];
    const b = Number(parts[2]);

    switch(operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return Math.floor(a / b);
        default: return 0;
    }
}

function generujDzialania() {
    dzialaniaList = [];
    for(let i = 0; i < totalSteps; i++){
        dzialaniaList.push(losoweDzialanie());
    }
}

function startHakowania(){
    hakowanieZakonczone = false;
    generujDzialania();
    const box = document.getElementById("box");
    
    box.innerHTML = "";
    const hakowanieDiv = document.createElement("div");
    const hakowanieLinia = document.createElement("hr");
    const hakowanieWpisywanie = document.createElement("input")

    hakowanieDiv.classList.add("hakowanie");
    hakowanieDiv.innerHTML = "[ OBLICZ RÓWNANIA MATEMATYCZNE ]";

    hakowanieLinia.classList.add("linia");
    
    hakowanieWpisywanie.classList.add("wpisywanie");
    hakowanieWpisywanie.type="number";
    hakowanieWpisywanie.setAttribute("placeholder", "WYNIK")

    box.appendChild(hakowanieDiv);
    box.appendChild(hakowanieLinia);
    box.appendChild(hakowanieWpisywanie);

    hakowanieWpisywanie.focus();

    currentStep = 0;
    pokazDzialanie();

    hakowanieWpisywanie.addEventListener("keypress", function(event){
        if(event.key === "Enter"){
            nextDzialanie();
        }
    });

    const timerDiv = document.createElement("p");
    timerDiv.classList.add("tekst");
    timerDiv.style.bottom = "140px";
    timerDiv.style.fontSize = "25px";
    timerDiv.innerText = "10";
    box.appendChild(timerDiv);

    let timeLeft = 10;

    const interval = setInterval(() => {
        if (hakowanieZakonczone) { 
            clearInterval(interval);
            return;
        }

        timeLeft--;
        timerDiv.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            bladHakowania();
        }
    }, 1000);
}

function pokazDzialanie() {
    const box = document.getElementById("box");

    const prevDzialanie = box.querySelector(".dzialanie");
    if(prevDzialanie) prevDzialanie.remove();

    if(currentStep >= totalSteps){
        koniecHakowania();
        return;
    }

    const dzialanieDiv = document.createElement("div");
    dzialanieDiv.classList.add("dzialanie");
    dzialanieDiv.innerText = dzialaniaList[currentStep];
    box.insertBefore(dzialanieDiv, box.querySelector(".wpisywanie"));
}

function obliczWynik(dzialanie) {
    const parts = dzialanie.split(" ");
    const a = Number(parts[0]);
    const operator = parts[1];
    const b = Number(parts[2]);

    switch(operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return Math.floor(a / b);
        default: return 0;
    }
}

function nextDzialanie() {
    const input = document.querySelector(".wpisywanie");
    const userValue = Number(input.value);

    if(userValue !== obliczWynik(dzialaniaList[currentStep])) {
        bladHakowania();
        return;
    }

    input.value = "";
    currentStep++;
    pokazDzialanie();
}

function koniecHakowania() {
    hakowanieZakonczone = true;
    const box = document.getElementById("box");
    
    box.innerHTML = "";

    const img = document.createElement("img");
    img.src = "zdjece.png";
    img.classList.add("zdjecie");
    box.appendChild(img);

    const tekst = document.createElement("p");
    tekst.classList.add("tekst");
    tekst.innerText = "[HACK UDANY]";
    box.appendChild(tekst);

    const loadingContainer = document.createElement("div");
    loadingContainer.classList.add("loading-container");
    const loadingBar = document.createElement("div");
    loadingBar.id = "loading-bar";
    loadingBar.classList.add("loading-bar");
    loadingContainer.appendChild(loadingBar);
    box.appendChild(loadingContainer);

    ladowanie2();
}

function bladHakowania() {
    hakowanieZakonczone = true;
    const box = document.getElementById("box");

    box.innerHTML = "";

    const img = document.createElement("img");
    img.src = "zdjece.png";
    img.classList.add("zdjecie");
    box.appendChild(img);

    const tekst = document.createElement("p");
    tekst.classList.add("tekst");
    tekst.innerText = "[HACK NIEUDANY]";
    box.appendChild(tekst);

    const loadingContainer = document.createElement("div");
    loadingContainer.classList.add("loading-container");
    const loadingBar = document.createElement("div");
    loadingBar.id = "loading-bar";
    loadingBar.classList.add("loading-bar");
    loadingContainer.appendChild(loadingBar);
    box.appendChild(loadingContainer);

    ladowanie2();
}

function wyswietlStart() {
    const box = document.getElementById("box");
    box.innerHTML = "";

    const startButton = document.createElement("button");
    startButton.classList.add("przycisk");
    startButton.innerText = "ROZPOCZNIJ HAKOWANIE";
    startButton.addEventListener("click", startHack2);
    box.appendChild(startButton);
}

function startHack2() {
    const box = document.getElementById("box");
    box.innerHTML = "";

    const img = document.createElement("img");
    img.src = "zdjece.png";
    img.classList.add("zdjecie");
    box.appendChild(img);

    const tekst = document.createElement("p");
    tekst.classList.add("tekst");
    tekst.innerText = "[PRZYGOTUJ SIĘ..]";
    box.appendChild(tekst);

    const loadingContainer = document.createElement("div");
    loadingContainer.classList.add("loading-container");
    const loadingBar = document.createElement("div");
    loadingBar.id = "loading-bar";
    loadingBar.classList.add("loading-bar");
    loadingContainer.appendChild(loadingBar);
    box.appendChild(loadingContainer);

    ladowanie();
}