function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function operate(operation, a, b) {
  let result = 0;
  switch (operation) {
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

const result = document.querySelector("#result");
const calc = document.querySelector("#calculations");

// placeholders for operate function parameters
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
    
    // if clicked operation, store the text value of result before clicking another value
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
        // reset after clicking equals button
        clear();

    }
    // clear the initial value "0" so that the first pressed value will be at the front
    if(result.textContent == "0") {
        result.textContent = "";
    }

    // add pressed number values at the back
    result.textContent += e.target.textContent;
    
}));

const periodButton = document.querySelector(".button-period");
periodButton.addEventListener("click", (e) => {
  // do nothing if theres already a period, preventing period spam
  if (result.textContent.includes(".")) {
    return;
  }
  //add period at back if result text
  result.textContent += e.target.textContent;
});

const operationButtons = document.querySelectorAll('.button-operation');
operationButtons.forEach(button => button.addEventListener('click', e => {
    clickedOperations = true;

    // clear calculation text
    if(clickedEquals){
        calc.textContent = "";
        clickedEquals = false;
    }

    if (clickedNumber) {
        // track the number of operation clicks
        numberOfOperation++;

        secondNumber = result.textContent;

        // add result text and operation sign to calculation text
        calc.textContent += result.textContent+e.target.textContent;

        // evaluate previous pair of numbers if another operation is added
        if (numberOfOperation > 1) {
            // +in var is unary. It converts operand to number if not number
            result.textContent = operate(operation, +firstNumber, +secondNumber);
        }
    }

    operation = e.target.value;

    // if the last calc text value is an operation, you can change it to another operation
    if(calc.textContent != ""){
        calc.textContent = calc.textContent.slice(0,-1) + e.target.textContent;
    }

    clickedNumber = false;
}));

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", (e) => {
  //disable equal button if conditions are true to prevent spam
  if (calc.textContent.includes("=") ||
    calc.textContent == "" ||
    clickedOperations
  ) {
    return;
  }

  numberOfOperation = 0;
  secondNumber = result.textContent;
  calc.textContent = calc.textContent + result.textContent + e.target.textContent;
  result.textContent = operate(operation, +firstNumber, +secondNumber);
  clickedEquals = true;
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);

const clearEntryButton = document.querySelector("#clear-entry");
clearEntryButton.addEventListener("click", () => {
  result.textContent = 0;
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  result.textContent = result.textContent.slice(0, -1);
  //if theres no number to delete, result text = 0
  if (result.textContent.length < 1) {
    result.textContent = "0";
  }
});

function clear() {
  result.textContent = "";
  calc.textContent = "";
  firstNumber = 0;
  secondNumber = 0;
  result.textContent = 0;
}
