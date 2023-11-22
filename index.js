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
let passwordLength = 10;
let checkCount = 1;
// set strength circle color to gray

function HandleSlider(){
    lengthDisplay.textContent = passwordLength;
    inputSlider.value = passwordLength;
};

function SetIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxshadow =`0 0 2px ${color}`;
};

function getRandInteger(min,max){
    Math.round(Math.Random()*(max-min)) + min;
}

function generateRandomNumber(){
    return getRandInteger(0,9);
}

function generateRandomLowercase(){
    return String.fromCharCode(getRandInteger(97,122));
}

function generateRandomUppercase(){
    return String.fromCharCode(getRandInteger(65,90));
}

function generateRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols.charAt[getRandInteger(0,symbols.length-1)];
}


function calcStrenght(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(numberCheck.checked){
        hasNumber = true;
    }
    if(symbolsCheck.checked){
        hasSymbol = true;
    }

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
        SetIndicator("green");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 4){
        SetIndicator("orange");
    }
    else{
        SetIndicator("red");
    }
}



async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(err){
        copyMsg.innerText = 'failed'
    }
}
















// setting password lenght value accordind to the slider
inputSlider.addEventListener("input", ()=>{
    passwordLength = inputSlider.value;
    lengthDisplay.textContent = passwordLength;
});











