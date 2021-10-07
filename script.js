const inputs = document.querySelectorAll("input[type=range]");
const fileLoad = document.querySelector('input[type=file]');
const resetBtn = document.getElementById('btn-reset');
const nextBtn = document.getElementById('btn-next');
const savePictureBtn = document.getElementById('btn-save');
let image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const fullscreenBtn = document.querySelector('.fullscreen');



function getFilterValue() {
  inputs.forEach(input => {
  let outputs = input.nextElementSibling;
  outputs.value = input.value;
  })
}

function applyFilter() {
  let filterValue = '';
  inputs.forEach(() => {
    filterValue = this.value + this.dataset.sizing ;
    image.style.setProperty(`--${this.name}`, filterValue);
  })
}

function resetValues() {
  inputs.forEach(input => {
    let outputs = input.nextElementSibling;
    outputs.value = input.defaultValue;
    input.value = input.defaultValue;

    image.style.cssText = "";
    })
}


const baseNight = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/';
const baseMorning = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/';
const baseDay = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/';
const baseEvening = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/';

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    image.src = src;
  }; 
}
function getImage() {
  let date = new Date();
  let time = date.getHours();
  let base = '';
  if (time >= 6 && time < 12) {
    base = baseMorning;
  }
  if (time >= 12 && time < 18) {
    base = baseDay;
  }
  if (time >= 18 && time < 24) {
    base = baseEvening;
  }
  if (time >= 0 && time < 6) {
    base = baseNight;
  }
  
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewImage(imageSrc);
  i++;

  nextBtn.disabled = true;
  setTimeout(function() { nextBtn.disabled = false }, 500);
} 

function loadPicture(e) {
  const imageContainer = document.querySelector('img');
  const file = fileLoad.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imageContainer.src = reader.result;
    fileLoad.value = '';
  }
  reader.readAsDataURL(file);
}

function drawImage() {
  let blurFilter = document.querySelector('#blur').value;
  let invertFilter = document.querySelector('#invert').value;
  let sepiaFilter = document.querySelector('#sepia').value;
  let saturateFilter = document.querySelector('#saturate').value;
  let hueFilter = document.querySelector('#hue').value;
  
  let coef = 0;
  
  

  const imageContainer = document.querySelector('img');
  const img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imageContainer.src;

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    if(img.width >= img.height) {
      coef = canvas.width / imageContainer.clientWidth;
    } else {
      coef = canvas.height / imageContainer.clientHeight;
    }
    let blur = blurFilter*coef;

    const ctx = canvas.getContext("2d");
    ctx.filter = `blur(${blur}px) invert(${invertFilter}%) sepia(${sepiaFilter}%) saturate(${saturateFilter}%) hue-rotate(${hueFilter}deg)`;
    ctx.drawImage(img, 0, 0);

    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    console.log(imageContainer.clientWidth)
  }; 
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

inputs.forEach(input => input.addEventListener('input', getFilterValue));
inputs.forEach(input => input.addEventListener('input', applyFilter));

resetBtn.addEventListener('click', resetValues);
nextBtn.addEventListener('click', getImage);

fileLoad.addEventListener('change', loadPicture);
savePictureBtn.addEventListener('click', drawImage);

fullscreenBtn.addEventListener('click', toggleFullScreen);