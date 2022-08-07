function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operation, a, b){
    let result = 0;
    switch(operation){
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    }
    return result;
}

const result = document.querySelector('#result');
const calc = document.querySelector('#calculations');
let firstNumber = 0;
let secondNumber = 0;
let operation = "";
let clickedOperations = false;
let clickedEquals = false;
let numberOfOperation = 0;
const numberButtons = document.querySelectorAll('.button-number');
numberButtons.forEach(button => button.addEventListener('click', e => {
    firstNumber = result.textContent;
    if(clickedOperations){
        clickedOperations = false;
        result.textContent = "";
    }
    if(result.textContent == "0" || clickedEquals){
        clickedEquals = false;
        clear();
    }
    result.textContent += e.target.textContent;
    result.parentElement.appendChild(result);
}));

const operationButtons = document.querySelectorAll('.button-operation');
operationButtons.forEach(button => button.addEventListener('click', e => {
    numberOfOperation++;
    
    secondNumber = result.textContent;
    calc.textContent += result.textContent+e.target.textContent;

    if (numberOfOperation > 1) {
        result.textContent = operate(operation, +firstNumber, +secondNumber);
    }
    operation = e.target.value;
    clickedOperations = true;
}));

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', e => {
    if(clickedEquals){
        secondNumber = result.textContent;
        let pastCalcTest = calc.textContent;
        calc.textContent = "";
        result.textContent = operate(operation, +firstNumber, +secondNumber);
        calc.textContent = result.textContent + pastCalcTest.slice(1);
        
    }else {
        numberOfOperation = 0;
        secondNumber = result.textContent;
        calc.textContent = calc.textContent + result.textContent +e.target.textContent;
        result.textContent = operate(operation, +firstNumber, +secondNumber);
        clickedEquals = true;
    }

})



function clear(){
    result.textContent = "";
    calc.textContent = "";
    secondNumber = 0;
}