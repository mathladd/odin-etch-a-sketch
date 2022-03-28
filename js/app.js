
function main() {
    let mainContainer = document.querySelector('.main-container');
    let sizeNumSlider = document.querySelector('.size-num-slider')
    let sizeNumSliderDisplay = document.querySelector('.slider-display')
    let sideNum;

    let minSizeNum = 10;
    let maxSizeNum = 100;
    let defaultSizeNum = Math.floor((maxSizeNum - minSizeNum)/2);

    let rgbDisplay = document.querySelector('.rgb-display')
    let minRGB = 0;
    let maxRGB = 255;
    let defaultRGB = Math.floor((maxRGB - minRGB)/2);
    let redColor = defaultRGB;
    let greenColor = defaultRGB; 
    let blueColor = defaultRGB;

    getCanvas(mainContainer, defaultSizeNum, redColor, greenColor, blueColor);

    sizeNumSlider.setAttribute('min', minSizeNum);
    sizeNumSlider.setAttribute('max', maxSizeNum);
    sizeNumSlider.setAttribute('value', defaultSizeNum);

    sizeNumSliderDisplay.textContent = `${defaultSizeNum} x ${defaultSizeNum}`;

    sizeNumSlider.addEventListener('input', () => {
        let sliderVal = sizeNumSlider.value
        sizeNumSliderDisplay.textContent = `${sliderVal} x ${sliderVal}`;
    })

    let redSlider = document.querySelector('.rgb-slider-red')
    let greenSlider = document.querySelector('.rgb-slider-green')
    let blueSlider = document.querySelector('.rgb-slider-blue')

    redSlider.setAttribute('min', minRGB);
    redSlider.setAttribute('max', maxRGB);
    redSlider.setAttribute('value', defaultRGB);

    greenSlider.setAttribute('min', minRGB);
    greenSlider.setAttribute('max', maxRGB);
    greenSlider.setAttribute('value', defaultRGB);

    blueSlider.setAttribute('min', minRGB);
    blueSlider.setAttribute('max', maxRGB);
    blueSlider.setAttribute('value', defaultRGB);

    redSlider.addEventListener('input', () => {
        redColor = redSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`
    })

    greenSlider.addEventListener('input', () => {
        greenColor = greenSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`
    })
        
    blueSlider.addEventListener('input', () => {
        blueColor = blueSlider.value;
        rgbDisplay.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`
    })

    sizeNumSlider.addEventListener('change', () => {
        sideNum = sizeNumSlider.value;
        mainContainer.removeChild(mainContainer.lastElementChild);
        getCanvas(mainContainer, defaultSizeNum, redColor, greenColor, blueColor);
    })
}

function getCanvas(mainContainer, sideNum, redColor, greenColor, blueColor) {
    let sideSize = 500;
    let mouseDown;
    window.addEventListener('mousedown', () => {mouseDown = true})
    window.addEventListener('mouseup', () => {mouseDown = false})

    mainContainer.appendChild(getGridItems(sideNum, sideSize));
    let allGridItems = document.getElementsByClassName('grid-item');
    Array.from(allGridItems).forEach(gridItem => gridItem.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            e.target.style['background-color'] = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
        }
    }))
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
    main()
  }
