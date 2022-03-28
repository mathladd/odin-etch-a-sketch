
function colorCanvas() {
    let redSlider = document.querySelector('.rgb-slider-red');
    let greenSlider = document.querySelector('.rgb-slider-green');
    let blueSlider = document.querySelector('.rgb-slider-blue');

    let minRGB = 0;
    let maxRGB = 255;
    let defaultRGB = Math.floor((maxRGB - minRGB)/2);

    setRGBSliderSettings(redSlider, minRGB, maxRGB, defaultRGB);
    setRGBSliderSettings(greenSlider, minRGB, maxRGB, defaultRGB);
    setRGBSliderSettings(blueSlider, minRGB, maxRGB, defaultRGB);

    let redColor = redSlider.value;
    let greenColor = greenSlider.value;
    let blueColor = blueSlider.value;
    let rgbDisplay = document.querySelector('.rgb-display')

    redSlider.addEventListener('input', () => {
        redColor = redSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    });

    greenSlider.addEventListener('input', () => {
        greenColor = greenSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    });

    blueSlider.addEventListener('input', () => {
        blueColor = blueSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    });

    let mouseDown;
    window.addEventListener('mousedown', () => { mouseDown = true; });
    window.addEventListener('mouseup', () => { mouseDown = false; });

    let allGridItems = document.getElementsByClassName('grid-item');
    Array.from(allGridItems).forEach(gridItem => gridItem.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            e.target.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
        }
    }));
}


function setRGBSliderSettings(slider, minRGB, maxRGB, defaultRGB) {
    slider.setAttribute('min', minRGB);
    slider.setAttribute('max', maxRGB);
    slider.setAttribute('value', defaultRGB);
}


function getCanvas() {
    let mainContainer = document.querySelector('.main-container');
    let sizeNumSlider = document.querySelector('.size-num-slider')
    let sizeNumSliderDisplay = document.querySelector('.slider-display')
    let resetButton = document.querySelector('.slider-reset')
    let sideSize = 500;

    let minSizeNum = 10;
    let maxSizeNum = 100;
    let defaultSizeNum = Math.floor((maxSizeNum - minSizeNum)/2);

    mainContainer.appendChild(getGridItems(defaultSizeNum, sideSize));
    colorCanvas();

    sizeNumSlider.setAttribute('min', minSizeNum);
    sizeNumSlider.setAttribute('max', maxSizeNum);
    sizeNumSlider.setAttribute('value', defaultSizeNum);

    sizeNumSliderDisplay.textContent = `${defaultSizeNum} x ${defaultSizeNum}`;

    sizeNumSlider.addEventListener('input', () => {
        let sliderVal = sizeNumSlider.value;
        sizeNumSliderDisplay.textContent = `${sliderVal} x ${sliderVal}`;
    });

    sizeNumSlider.addEventListener('change', () => {
        let sideNum = sizeNumSlider.value;
        mainContainer.removeChild(mainContainer.lastElementChild);
        mainContainer.appendChild(getGridItems(sideNum, sideSize));
        colorCanvas();
    });

    resetButton.addEventListener('click', () => {
        let sideNum = sizeNumSlider.value;
        mainContainer.removeChild(mainContainer.lastElementChild);
        mainContainer.appendChild(getGridItems(sideNum, sideSize));
        colorCanvas();
    });
}


function getGridItems(sideNum, sideSize) {
    let mainDiv = document.createElement('div');
    let gridItemSide = sideSize/sideNum;
    mainDiv.style['border'] = '1px solid black'

    for (let i=0; i < sideNum; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.style['display'] = 'flex';
        rowDiv.style['flex-flow'] = 'row nowrap'
    
        for (let j=0; j < sideNum; j++) {
            let gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style['height'] = `${gridItemSide}px`;
            gridItem.style['width'] = `${gridItemSide}px`;
            gridItem.style['user-select'] = 'none';
            rowDiv.appendChild(gridItem)
        }
        mainDiv.appendChild(rowDiv);
    }
    return mainDiv;
}


window.onload = () => {
    getCanvas()
  }
