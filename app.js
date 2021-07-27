//	Variable Declarations
let radioChoice, inputHeight, inputWidth, substrate, inputArea, billArea, printCost, cpi, inchHeight, inchWidth, estimate, errorNote;
const costGroup01 = ["Archival Textured", "Archival Glossy", "Archival Canvas"];
const costGroup02 = ["Archival Matte"];
const costGroup03 = ["Archival Matte Light", "Archival Textured Light"];
const costGroup04 = ["Fine Art Matte Fiber", "Fine Art Metallic", "Fine Art Canvas"];
const costGroup05 = ["Fine Art Matte Coated", "Fine Art Luster", "Fine Art Glossy"];
const paperMax24 = [""];
const paperMax36 = ["Archival Matte Light"];
const radios = document.querySelectorAll('input[type=radio]');
const list = document.querySelector("#list");

const resetFields = () => {
  // document.querySelector("#radioin").checked = true; // To reset measure units to INCHES, add id="radioin" to radio input  
  document.querySelector("#inputHeight").value = "";
  document.querySelector("#inputWidth").value = "";
  document.querySelector("#substrate").value = "not-valid";
  //document.querySelector("#errorNote").innerHTML = ""
}

// Live update placeholders with measure units.
radios.forEach(radio => radio.addEventListener('change', () => {
  document.querySelector(`#inputHeight`).placeholder = radio.value;
  document.querySelector(`#inputWidth`).placeholder = radio.value;
}));

const getInputs = () => {
  radioChoice = document.querySelector('input[type="radio"]:checked').value;
  inputHeight = Math.abs(document.querySelector("#inputHeight").valueAsNumber);
  inputWidth = Math.abs(document.querySelector("#inputWidth").valueAsNumber);
  substrate = document.querySelector("#substrate").value;
}

const setCPI = function () {     // in no paper is selected, CPI = 0
  if (costGroup01.includes(substrate)) {
    if (billArea <= 100) { cpi = 1.8 }
    else if (100 < billArea && billArea <= 150) { cpi = 1.7 }
    else if (150 < billArea && billArea <= 200) { cpi = 1.65 }
    else if (200 < billArea && billArea <= 250) { cpi = 1.6 }
    else if (250 < billArea && billArea <= 300) { cpi = 1.55 }
    else if (300 < billArea && billArea <= 400) { cpi = 1.5 }
    else if (400 < billArea && billArea <= 1000) { cpi = 1.45 }
    else if (1000 < billArea && billArea <= 1500) { cpi = 1.5 }
    else if (1500 < billArea && billArea <= 2000) { cpi = 1.55 }
    else if (2000 < billArea && billArea <= 2500) { cpi = 1.6 }
    else if (2500 < billArea) { cpi = 1.65 }
  } else if (costGroup02.includes(substrate)) {
    if (billArea <= 100) { cpi = 1.6 }
    else if (100 < billArea && billArea <= 150) { cpi = 1.5 }
    else if (150 < billArea && billArea <= 200) { cpi = 1.4 }
    else if (200 < billArea && billArea <= 250) { cpi = 1.35 }
    else if (250 < billArea && billArea <= 300) { cpi = 1.3 }
    else if (300 < billArea && billArea <= 400) { cpi = 1.25 }
    else if (400 < billArea && billArea <= 1000) { cpi = 1.2 }
    else if (1000 < billArea && billArea <= 1500) { cpi = 1.25 }
    else if (1500 < billArea && billArea <= 2000) { cpi = 1.3 }
    else if (2000 < billArea && billArea <= 2500) { cpi = 1.35 }
    else if (2500 < billArea) { cpi = 1.4 }
  } else if (costGroup03.includes(substrate)) {
    if (billArea <= 100) { cpi = 1.35 }
    else if (100 < billArea && billArea <= 150) { cpi = 1.25 }
    else if (150 < billArea && billArea <= 200) { cpi = 1.15 }
    else if (200 < billArea && billArea <= 250) { cpi = 1.1 }
    else if (250 < billArea && billArea <= 300) { cpi = 1.05 }
    else if (300 < billArea && billArea <= 400) { cpi = 1 }
    else if (400 < billArea && billArea <= 1000) { cpi = 0.95 }
    else if (1000 < billArea && billArea <= 1500) { cpi = 1 }
    else if (1500 < billArea && billArea <= 2000) { cpi = 1.05 }
    else if (2000 < billArea && billArea <= 2500) { cpi = 1.1 }
    else if (2500 < billArea) { cpi = 1.15 }
  } else if (costGroup04.includes(substrate)) {
    if (billArea <= 100) { cpi = 1.2 }
    else if (100 < billArea && billArea <= 150) { cpi = 1.1 }
    else if (150 < billArea && billArea <= 200) { cpi = 1 }
    else if (200 < billArea && billArea <= 250) { cpi = 0.95 }
    else if (250 < billArea && billArea <= 300) { cpi = 0.9 }
    else if (300 < billArea && billArea <= 400) { cpi = 0.85 }
    else if (400 < billArea && billArea <= 1000) { cpi = 0.8 }
    else if (1000 < billArea && billArea <= 1500) { cpi = 0.85 }
    else if (1500 < billArea && billArea <= 2000) { cpi = 0.9 }
    else if (2000 < billArea && billArea <= 2500) { cpi = 0.95 }
    else if (2500 < billArea) { cpi = 1 }
  } else if (costGroup05.includes(substrate)) {
    if (billArea <= 100) { cpi = 1.05 }
    else if (100 < billArea && billArea <= 150) { cpi = 0.95 }
    else if (150 < billArea && billArea <= 200) { cpi = 0.85 }
    else if (200 < billArea && billArea <= 250) { cpi = 0.8 }
    else if (250 < billArea && billArea <= 300) { cpi = 0.75 }
    else if (300 < billArea && billArea <= 400) { cpi = 0.7 }
    else if (400 < billArea && billArea <= 1000) { cpi = 0.65 }
    else if (1000 < billArea && billArea <= 1500) { cpi = 0.7 }
    else if (1500 < billArea && billArea <= 2000) { cpi = 0.75 }
    else if (2000 < billArea && billArea <= 2500) { cpi = 0.8 }
    else if (2500 < billArea) { cpi = 0.85 }
  } else { cpi = 0 }
}

function currencyFormat(num) {
  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

const logInputValues = () => {
  console.log(`INPUT: ${inputHeight}${radioChoice} by ${inputWidth}${radioChoice} on ${substrate}`)
};

const displayOutput = () => {
  checkInput(); // determines error messages
  estimate = `${inputHeight}x${inputWidth}${radioChoice} ${substrate}: ${currencyFormat(printCost)}`;
  if (errorNote === "no errors") {
    // document.querySelector("#output").innerHTML = estimate;
    addItem();
  } else {
    document.querySelector("#output").innerHTML = `<p style="color:red">${errorNote}</p>`
  }
};

//Add items the estimat list
const addItem = (event) => {
  const newItem = document.createElement("div");
  newItem.classList.add("newItem")
  const newLi = document.createElement("li");
  newLi.innerText = estimate;
  const delButton = document.createElement("button");
  delButton.classList.add("delButton")
  delButton.innerHTML = `<i class="fas fa-trash" title="Remove"></i>`;
  list.appendChild(newItem);
  newItem.appendChild(newLi);
  newItem.appendChild(delButton);
  document.querySelector("#output").innerHTML = "";
};

const delItem = (e) => {
  const clickedItem = e.target;
  if (clickedItem.classList[0] === "delButton") {
    const delTarget = clickedItem.parentElement;
    delTarget.remove();
  }
};

const checkInput = () => { // checking if inputs are valid and generate error messages.
  inchHeight = inputHeight;
  inchWidth = inputWidth;
  if (radioChoice === "mm") {
    inchHeight = (inputHeight / 25.4).toFixed(2);
    inchWidth = (inputWidth / 25.4).toFixed(2);
    //console.log(`Converted inputs:${inchHeight}" x ${inchWidth}"`)
  }
  if (!billArea > 0 || substrate === "not-valid") {
    errorNote = `Please enter valid dimensions and select substrate. `
  } else if (paperMax24.includes(substrate) && Math.min(inchHeight, inchWidth) > 23.5) {
    errorNote = `${substrate} comes in 24" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (23.5").`
  } else if (paperMax36.includes(substrate) && Math.min(inchHeight, inchWidth) > 35.5) {
    errorNote = `${substrate} comes in 36" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (35.5").`
  } else if (Math.min(inchHeight, inchWidth) > 43.5) {
    errorNote = `${substrate} comes in 44" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (43.5").`
  } else if (Math.max(inchHeight, inchWidth) > 88) {
    errorNote = 'Large prints require a custom quotation. <br>Please contact us for details.'
  } else { errorNote = "no errors"; };
};

const calcBillValues = () => {
  inputArea = Math.ceil(inputHeight) * Math.ceil(inputWidth);
  radioChoice === "mm" ? billArea = Math.ceil(inputHeight/25.4) * Math.ceil(inputWidth/25.4) : billArea = inputArea;
  if (billArea < 80) { billArea = 80 }
  setCPI();
  printCost = Math.ceil(billArea * cpi);
};

const logBillValues = () => {
  console.log(`BILLING: billArea:${billArea}, cpi: ${cpi}, printCost: ${currencyFormat(printCost)}`);
};

const runEstimate = () => {
  getInputs();
  logInputValues();
  calcBillValues();
  logBillValues();
  displayOutput();
  resetFields();
};

radios.forEach(radio => radio.addEventListener('change', () => {
  document.querySelector(`#inputHeight`).placeholder = radio.value;
  document.querySelector(`#inputWidth`).placeholder = radio.value;
}));

estButton.addEventListener("click", runEstimate);
list.addEventListener("click", delItem);
