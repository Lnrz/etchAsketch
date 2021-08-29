function randomRGB() {

    let rgb = Math.floor((Math.random() * 16777216));

    rgb = rgb.toString(16);

    while (rgb.length < 6) {
        rgb = "0" + rgb;
    }

    return "#" + rgb;
}

function darkerHelper(string) {

    string = Math.floor(parseFloat(string, 16));

    if (string < 25) {
        return "00";
    } else {
        string -= 25;
        string = string.toString(16);

        if (string.length < 2) {
            return "0" + string;
        }
        else {
            return string;
        }
    }
}

function darker(color) {

    color = color.slice(4, color.length - 1);

    color = color.split(",");

    color = color.map(str => {
        str = str.trim();
        return darkerHelper(str);
    });
    
    return "#" + color.join("");
}

function makeDarker(obj) {
    const div = obj.target;
    let divColor = div.style.backgroundColor;
    
    divColor = darker(divColor);

    div.style.backgroundColor = divColor;

    if (divColor != "#000000") {
        div.addEventListener("mouseenter", makeDarker, {once: true});
    }
}

function changeColor(obj) {
    const div = obj.target;

    div.style.backgroundColor = randomRGB();

    div.addEventListener("mouseenter", makeDarker, {once: true});
}

function changeColorBlack(obj) {
    const div = obj.target;

    div.style.backgroundColor = "black";
}

function reset() {
    while(frame.firstChild) {
        frame.removeChild(frame.firstChild);
    }

    let divNum = 0;
    while (divNum <= 0 || divNum > 100) {
        divNum = +prompt("Quante caselle per riga e colonna?", "16");
        if (divNum <= 0 || divNum > 100) {
            alert("Numero inserito non valido, si prega di inserirne uno valido");
        }
    }

    frame.style.setProperty("--rowsColumns", `${divNum}`);

    divNum **= 2;
    
    for (let i = 0; i < divNum; i++) {
        const div = document.createElement("div");
        if (toBlack) {
            div.addEventListener("mouseenter", changeColorBlack, {once: true});
        } else {
            div.addEventListener("mouseenter", changeColor, {once: true});
        }
        frame.appendChild(div);
    }
}

function switchColor() {

    toBlack = !toBlack;

    const divs = document.querySelectorAll("#frame > div");

    divs.forEach(div => div.style.backgroundColor = "white");

    if (toBlack) {
        colorBtn.textContent = "Bianco e nero";
        colorBtn.style.left = "var(--blackLeft)";
        
        divs.forEach(div => {
            div.removeEventListener("mouseenter", changeColor);
            div.removeEventListener("mouseenter", makeDarker);
            div.addEventListener("mouseenter", changeColorBlack, {once: true})
        });
    } else {
        colorBtn.innerHTML = "<span id='rainbow'>Multicolore</span>";
        colorBtn.style.left = "var(--multicolorLeft)";

        divs.forEach(div => {
            div.removeEventListener("mouseenter", changeColorBlack);
            div.addEventListener("mouseenter", changeColor, {once: true})
        });
    }
}
//////////////////////////////////////////////////////////////

const frame = document.querySelector("#frame");
const resetBtn = document.querySelector("#reset");
const colorBtn = document.querySelector("#color");
let toBlack = false;

for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.addEventListener("mouseenter", changeColor, {once: true});
    frame.appendChild(div);
}

resetBtn.addEventListener("click", reset);
colorBtn.addEventListener("click", switchColor);