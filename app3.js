//Variable Declarations
let radioChoice, inputHeight, inputWidth, substrate, inputArea, billArea, printCost, cpi, inchHeight, inchWidth, errorNote;
const costGroup01 = ["Archival Matte Light (230 gsm)", "Archival Textured Light (285 gsm)"];
const costGroup02 = ["Archival Matte (310 gsm)"];
const costGroup03 = ["Archival Textured (310 gsm)", "Archival Gloss Baryta (320 gsm)", "Archival Canvas (450 gsm)"];
const costGroup04 = ["Metalic (290 gsm)", "Canvas (380 gsm)"];
const costGroup05 = ["Matte Coated (180 gsm)", "Matte Fiber (200 gsm)", "Luster (240 gsm)", "Glossy (240 gsm)"];
const paperMax24 = ["Matte Fiber (200 gsm)"];
const paperMax36 = ["Archival Matte Light (230 gsm)"];


resetFields = () => {
  // document.querySelector("#radioin").checked = true; // Keeping measure units from last selection 
  document.querySelector("#inputHeight").value = "";
  document.querySelector("#inputWidth").value = "";
  document.querySelector("#substrate").value = "not-valid";
}

getInputs = () => {
  radioChoice = document.querySelector('input[type="radio"]:checked').value;
  inputHeight = document.querySelector("#inputHeight").valueAsNumber;
  inputWidth = document.querySelector("#inputWidth").valueAsNumber;
  substrate = document.querySelector("#substrate").value;
}

setCPI = function() {     // in no paper is selected, CPI = 0
if (costGroup01.includes(substrate)) {
  if (billArea<=100) {cpi = 1.3} 
  else if (100<billArea && billArea<=150) {cpi = 1.15} 
  else if (150<billArea && billArea<=200) {cpi = 1.1} 
  else if (200<billArea && billArea<=300) {cpi = 1.05} 
  else if (300<billArea && billArea<=400) {cpi = 1} 
  else if (400<billArea && billArea<=500) {cpi = 0.95} 
  else if (500<billArea && billArea<=1000) {cpi = 0.9} 
  else if (1000<billArea && billArea<=1500) {cpi = 0.95} 
  else if (1500<billArea && billArea<=2000) {cpi = 1} 
  else if (2000<billArea) {cpi = 1.05} 
} else if (costGroup02.includes(substrate)) {
  if (billArea<=100) {cpi = 1.5} 
  else if (100<billArea && billArea<=150) {cpi = 1.35} 
  else if (150<billArea && billArea<=200) {cpi = 1.3} 
  else if (200<billArea && billArea<=300) {cpi = 1.25} 
  else if (300<billArea && billArea<=400) {cpi = 1.2} 
  else if (400<billArea && billArea<=500) {cpi = 1.15} 
  else if (500<billArea && billArea<=1000) {cpi = 1.1} 
  else if (1000<billArea && billArea<=1500) {cpi = 1.15} 
  else if (1500<billArea && billArea<=2000) {cpi = 1.2} 
  else if (2000<billArea) {cpi = 1.25} 
} else if (costGroup03.includes(substrate)) {
  if (billArea<=100) {cpi = 1.8} 
  else if (100<billArea && billArea<=150) {cpi = 1.65} 
  else if (150<billArea && billArea<=200) {cpi = 1.6} 
  else if (200<billArea && billArea<=300) {cpi = 1.55} 
  else if (300<billArea && billArea<=400) {cpi = 1.5} 
  else if (400<billArea && billArea<=500) {cpi = 1.45} 
  else if (500<billArea && billArea<=1000) {cpi = 1.4} 
  else if (1000<billArea && billArea<=1500) {cpi = 1.45} 
  else if (1500<billArea && billArea<=2000) {cpi = 1.5} 
  else if (2000<billArea) {cpi = 1.55} 
} else if (costGroup04.includes(substrate)) {
  if (billArea<=100) {cpi = 1.2} 
  else if (100<billArea && billArea<=150) {cpi = 1.05} 
  else if (150<billArea && billArea<=200) {cpi = 1} 
  else if (200<billArea && billArea<=300) {cpi = 0.95} 
  else if (300<billArea && billArea<=400) {cpi = 0.9} 
  else if (400<billArea && billArea<=500) {cpi = 0.85} 
  else if (500<billArea && billArea<=1000) {cpi = 0.8} 
  else if (1000<billArea && billArea<=1500) {cpi = 0.85} 
  else if (1500<billArea && billArea<=2000) {cpi = 0.9} 
  else if (2000<billArea) {cpi = 0.95} 
} else if (costGroup05.includes(substrate)) {
  if (billArea<=100) {cpi = 1} 
  else if (100<billArea && billArea<=150) {cpi = 0.85} 
  else if (150<billArea && billArea<=200) {cpi = 0.8} 
  else if (200<billArea && billArea<=300) {cpi = 0.75} 
  else if (300<billArea && billArea<=400) {cpi = 0.7} 
  else if (400<billArea && billArea<=500) {cpi = 0.65} 
  else if (500<billArea && billArea<=1000) {cpi = 0.6} 
  else if (1000<billArea && billArea<=1500) {cpi = 0.65} 
  else if (1500<billArea && billArea<=2000) {cpi = 0.7} 
  else if (2000<billArea) {cpi = 0.75} 
} else {cpi = 0}
console.log(`setCPI: billArea:${billArea}, substrate:${substrate}, cpi:${cpi}`)
}

function currencyFormat(num) {
  return 'HK$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') 
}

logInputValues = () => {
  console.log(`INPUT: ${inputHeight}${radioChoice} by ${inputWidth}${radioChoice} on ${substrate}`)
}

displayOutput = () => {
  checkInput();
  if (errorNote === "no errors") {
    document.querySelector("#output").innerHTML = `
    ${inputHeight}x${inputWidth}${radioChoice} on ${substrate}: <strong>${currencyFormat(printCost)}</strong>
    `
} else {
  document.querySelector("#output").innerHTML = `<p style="color:red">${errorNote}</p>`
}
}

checkInput = () => { // checking if inputs are valid and generate error messages
  if (radioChoice === "mm") {
    inchHeight = Math.ceil(inputHeight / 25.4);
    inchWidth = Math.ceil(inputWidth / 25.4);
  } else {
    inchHeight = inputHeight;
    inchWidth = inputWidth; 
  };
  if (!billArea>0 || substrate=== "not-valid") {
    errorNote = `Please enter valid dimensions and select substrate. `
  }
  else if (paperMax24.includes(substrate) && Math.min(inchHeight, inchWidth)>23.5) {
    errorNote = `${substrate} comes in 24" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (23.5").`
  }
  else if (paperMax36.includes(substrate) && Math.min(inchHeight, inchWidth)>35.5) {
    errorNote = `${substrate} comes in 36" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (35.5").`
  }
  else if(Math.min(inchHeight, inchWidth)>43.5) {
    errorNote = `${substrate} comes in 44" rolls; <br>Your dimension ${Math.min(inputHeight, inputWidth)}${radioChoice} exceeds the printable area (43.5").`
  }
  else if(Math.max(inchHeight, inchWidth)>88) {
    errorNote = 'Large prints require a custom quotation. <br>Please contact us for details.'
  }
  else {errorNote = "no errors";};
  console.log("errorNote: ", errorNote);
};

calcBillValues = () => {
  inputArea = inputHeight * inputWidth;
  radioChoice === "mm" ? billArea = Math.ceil(inputArea / 645.16) : billArea = Math.ceil(inputArea);
  if (billArea < 80) {billArea = 80}
  setCPI();
  printCost = billArea * cpi;
}

logBillValues = () => {
  console.log(`BILLING: billArea:${billArea}, cpi: ${cpi}, printCost: ${currencyFormat(printCost)}`);
}

runEstimate = () => {
  getInputs();
  logInputValues();
  calcBillValues();
  logBillValues();
  displayOutput();
  resetFields();
};  

button.addEventListener("click", runEstimate);

// TODO: Format inputs in html to accept only valid decimals on inch values, and no decimals on mm values