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

function modulo(a, b){
    return a % b;
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
        case "%":
            result = modulo(a, b);
            break;
        default:
            break;
    }

    return result;
}

const result = document.querySelector('#result');
const calc = document.querySelector('#calculations');

// placeholders for operate function
let firstNumber = 0;
let secondNumber = 0; 
let operation = ""; 

// var for constraints
let clickedOperations = false;
let clickedEquals = false;
let clickedNumber = false;
let numberOfOperation = 0;

const numberButtons = document.querySelectorAll('.button-number');
numberButtons.forEach(button => button.addEventListener('click', e => {

    clickedNumber = true;
    
    // store the text value of result before clicking another value
    // the text value before will be wiped out if you click another value
    // clear first result if pressed an operator to get second result value
    if(clickedOperations){
        firstNumber = result.textContent;
        clickedOperations = false;
        result.textContent = "";
    }
    // call clear function to restart all the values of the calc
    if(clickedEquals){
        clickedEquals = false;
        clear();
    }
    // clear the initial value "0" so that the first pressed value will be at the front
    if(result.textContent == "0") {
        result.textContent = "";
    }

    // add pressed number values at the back
    result.textContent += e.target.textContent;
    
}));

const operationButtons = document.querySelectorAll('.button-operation');
operationButtons.forEach(button => button.addEventListener('click', e => {
    // know the number of clicks
    numberOfOperation++;
    clickedOperations = true;
    if (clickedNumber) {
        secondNumber = result.textContent;
        // add operation sign to calculation text
        calc.textContent += result.textContent+e.target.textContent;
        // console.log("firstnum",firstNumber);
        // console.log("secondNum",secondNumber);

        // evaluate previous pair of numbers
        if (numberOfOperation > 1) {
            result.textContent = operate(operation, +firstNumber, +secondNumber);
        }
    }
    
    operation = e.target.value;
    // change operation if clicked another operation button
    calc.textContent = calc.textContent.slice(0,-1) + e.target.textContent;
    clickedNumber = false;

}));

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', e => {
    if(clickedEquals){
        secondNumber = result.textContent;
        let pastCalcTest = calc.textContent;
        calc.textContent = "";
        result.textContent = operate(operation, +firstNumber, +secondNumber);
        calc.textContent = secondNumber + pastCalcTest.slice(1);
        
    }else {
        numberOfOperation = 0;
        secondNumber = result.textContent;
        calc.textContent = calc.textContent + result.textContent +e.target.textContent;
        result.textContent = operate(operation, +firstNumber, +secondNumber);
        clickedEquals = true;
    }

})

const allClearButton = document.querySelector('#all-clear');
allClearButton.addEventListener('click', clear);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click',  () => {
    result.textContent = "";
    secondNumber = 0;
    result.textContent = 0;
});

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    result.textContent = result.textContent.slice(0,-1)
    if(result.textContent.length < 1){
        result.textContent = "0";
    }
});

function clear(){
    result.textContent = "";
    calc.textContent = "";
    secondNumber = 0;
    result.textContent = 0;
}