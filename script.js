//selectors
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".oper");
let equals = document.querySelector(".equals");
let visor = document.querySelector(".visor");
let del = document.querySelector(".delete");
let erase = document.querySelector(".erase");


//number savers
let numberInput = "";
let arrayInput = [];

//result controler
let isThereResult = false;


//operations
function sum(num1, num2){
    return num1 + num2;
};

function sub(num1, num2){
    return num1 - num2;
};

function mul(num1, num2){
    return num1 * num2;
};

function divide(num1, num2){
    return num1 / num2;
};

function calculate(num1, oper, num2){
    switch(oper){
        case "+":
            return sum(num1, num2);
            break;
        case "-":
            return sub(num1, num2);
            break;
        case "*":
            return mul(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            break;
    }
}

//whenever the user presses the numbers and the dot buttons, or written through the keyboard
function numberAction(key = 0){
    //let x;
    if(isThereResult == true){
        isThereResult = false;
        arrayInput = [];
        numberInput = "";
    }
    if(this.textContent != undefined){
        key = this.textContent;
    }
    this.blur();
    
    //there is no number in the numberInput and the user pressed the dot button
    if(numberInput == "" && key == "."){
        //do nothing
    //if the numberInput already has a dot and the user pressed the dot button
    }else if(numberInput.includes(".") && key == "."){
        //do nothing
    }else{
        numberInput += key;
        visor.textContent = numberInput;
    }
    document.querySelector(".visor").focus();
}

//when the user presses an operator
function operatorAction(key = 0){
    
    if(this.textContent != undefined){
        key = this.textContent;
    }
    if(isThereResult == true){
        isThereResult = false;
        arrayInput.push(key);
        visor.textContent = arrayInput.join(" ");
    }
    this.blur();
    
    if(numberInput != ""){
        if(arrayInput[1] == "/" && numberInput == "0"){
            visor.textContent = arrayInput.join(" ");
            alert("ERROR! Can't divide something by zero");
            numberInput = "";

        }else if(numberInput[numberInput.length-1] == "."){
            //do nothing
        }else if(arrayInput.length >= 2){
            arrayInput.push(numberInput);
            let result = String(calculate(+arrayInput[0], arrayInput[1], +arrayInput[2]));
            numberInput = result;
            arrayInput = [];
            arrayInput.push(numberInput);
            arrayInput.push(key);
            visor.textContent = arrayInput.join(" ");
            numberInput = "";
        }else{
            arrayInput.push(numberInput);
            numberInput = "";
            arrayInput.push(key);
            visor.textContent = arrayInput.join(" ");
        };  
    };
};

function equalAction(){
    this.blur();
    //document.querySelector(".visor").focus({ focusVisible: true });
    if(numberInput == ""){
    
    }else{
        if(isThereResult == false){
            if(arrayInput[1] == "/" && numberInput == "0"){
                visor.textContent = arrayInput.join(" ");
                alert("ERROR! Can't divide something by zero");
                numberInput = "";
            }else if(numberInput[numberInput.length-1] != "."){
                arrayInput.push(numberInput);
                let result = String(calculate(+arrayInput[0], arrayInput[1], +arrayInput[2]));
                numberInput = result * 10 / 10;
                arrayInput = [];
                arrayInput.push(numberInput);
                numberInput = "";
                if(arrayInput[0] == Math.floor(arrayInput[0])){
                    visor.textContent = arrayInput[0];
                }else{
                    visor.textContent = arrayInput[0].toFixed(5);
                }
                isThereResult = true;
            };
           
        };
    };
    
    
}

function delAction(){
    isThereResult = false;
    arrayInput = [];
    numberInput = "";
    visor.textContent = numberInput;    
}

function eraseAction(){
    numberInput = "";
    visor.textContent = arrayInput.join(" ");
}


//eventlisteners
numbers.forEach((elem) => {
    elem.addEventListener("click", numberAction);
});

operators.forEach((elem) => {
    elem.addEventListener("click", operatorAction);
});

equals.addEventListener("click", equalAction);

del.addEventListener("click", delAction);

erase.addEventListener("click", eraseAction);

//keyboard support
document.addEventListener("keydown", (event) =>{
    if(event.key == "Backspace"){
        delAction();
    }else if(event.key == "Enter"){
        equalAction();
    }else if(event.key == "e"){
        eraseAction();
    }

    switch(event.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            let x = String(event.key);
            numberAction(x);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            let y = String(event.key);
            operatorAction(y);
            break;
        default:
            break;
    };
});
