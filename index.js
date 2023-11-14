const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#upper-case");

const lowercaseCheck = document.querySelector("#lower-case");

const numberCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const genarateBtn = document.querySelector(".genarate-btn");

const allCheckBox = document.querySelectorAll("input[type = checkbox]");


let password = "";
let passwordLength = 9;
let checkCount = 1;
// set strength circle color to gray

lengthDisplay.textContent = passwordLength;








