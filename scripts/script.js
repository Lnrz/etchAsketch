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

    color.forEach(str => {
        str = str.trim();
        console.log(darkerHelper(str));
        return darkerHelper(str);
    });
    console.log(color[0]);
    console.log(color[1]);
    console.log(color[2]);
    /*
    let last = color[0];
    last = darkerHelper(last);

    let middle = color[1];
    middle = darkerHelper(middle);

    let first = color[2];
    first = darkerHelper(first);
    
    return "#" + last + middle + first;
    */
    let result = "#";

    for (let i = 0; i < 3; i++) {
        result = result + color[i];
        console.log(result);
    }

    return result;
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
//////////////////////////////////////////////////////////////

const frame = document.querySelector("#frame");

for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.addEventListener("mouseenter", changeColor, {once: true});
    frame.appendChild(div);
}