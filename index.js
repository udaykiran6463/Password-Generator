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
let passwordLength = 4;
let checkCount = 1;
// set strength circle color to gray
handleSlider();

uppercaseCheck.checked = true;

function handleSlider(){
    lengthDisplay.textContent = passwordLength;
    inputSlider.value = passwordLength;
};

function SetIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxshadow =`0 0 2px ${color}`;
};

function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    return symbols[getRandInteger(0,symbols.length-1)];
}


function calcStrength(){
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

function shufflePassword(){
    // fisher yates method
    // shuffle the password
    password = password.split("");
    for(let i = password.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        let temp = password[i];
        password[i] = password[j];
        password[j] = temp;
    }
    return password.join("");
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(err){
        copyMsg.innerText = 'failed'
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener("input",(e)=>{
    // passwordLength = inputSlider.value;
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener("click",copyContent);

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change",handleCheckBoxChange);
})

genarateBtn.addEventListener("click",()=>{
    // no checkbox checked
    if(checkCount <= 0){
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let create a new password 

    // reomve old password
    password = "";

    // let put the checkbox checked 
    // if(uppercaseCheck.checked){
    //     password += generateRandomUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateRandomLowercase();
    // }

    // if(numberCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateRandomSymbol();
    // } 
    
    
    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateRandomUppercase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateRandomLowercase);
    }   

    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }   

    if(symbolsCheck.checked){
        funcArr.push(generateRandomSymbol);
    }

    // complersory addition
    console.log(funcArr.length);
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log(password);
    // remaining addition
    console.log(passwordLength - checkCount);
    for(let i=0; i<passwordLength - checkCount; i++){
        password += funcArr[getRandInteger(0,funcArr.length-1)]();
    }
    console.log(password);


    // shuffle the password
    password = shufflePassword();

    passwordDisplay.value = password;  
    calcStrength();

    console.log(password);
});