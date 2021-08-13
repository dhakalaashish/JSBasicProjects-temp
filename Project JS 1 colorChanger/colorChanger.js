let rgb = document.querySelector('#rgb');
let hex = document.querySelector('#hex');

const randomColorGeneratorRGB = () => {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;

    return `rgb(${r},${g},${b})`;
}

const randomColorGeneratorHex = () => {
    let hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let random = () => Math.floor(Math.random() * hexArray.length);
    return `#${hexArray[random()]}${hexArray[random()]}${hexArray[random()]}${hexArray[random()]}${hexArray[random()]}${hexArray[random()]}`;
}

const colorChangerNormal = function () {

    let changeColorName = document.querySelector('#changeColorName');
    let colorValue = randomColorGeneratorRGB();
    document.body.style.backgroundColor = colorValue;
    changeColorName.innerText = colorValue;
}
changeColor.addEventListener('click', colorChangerNormal);


rgb.addEventListener('click', () => {
    let changeColor = document.querySelector('#changeColor');
    changeColorName.innerText = `Color Value in RGB`;

    const colorChangerRGB = function () {
        let changeColorName = document.querySelector('#changeColorName');
        let colorValue = randomColorGeneratorRGB();
        document.body.style.backgroundColor = colorValue;
        changeColorName.innerText = `Color Value in RGB: ${colorValue} `;
    }
    changeColor.addEventListener('click', colorChangerRGB);
})


hex.addEventListener('click', () => {
    let changeColor = document.querySelector('#changeColor');
    changeColorName.innerText = `Color Value in Hex`;

    const colorChangerHex = function () {
        let changeColorName = document.querySelector('#changeColorName');
        let colorValue = randomColorGeneratorHex();
        document.body.style.backgroundColor = colorValue;
        changeColorName.innerText = `Color Value in Hex: ${colorValue} `;
    }
    changeColor.addEventListener('click', colorChangerHex);
})



