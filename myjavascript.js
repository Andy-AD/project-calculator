let display_value = 0;
let lastValue = '';
let numberOne = 0;
let numberTwo = 0;
let operation;
let currentNumber = {
    number: '',
    hasDot() {
        return this.number.includes('.')
    },
};
let arrayOfOperations = [];

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});

function populateDisplay(event) {
    let value = event.target.innerText;
    switch (display_value) {
        case 0:
            if (isOperator(value) || value === "C" || value === "=") {
                break;
            } else if (value === '.') {
                display_value = '0.';
                currentNumber.number = display_value;
            } else {
                display_value = value;
                currentNumber.number = display_value;
            }
            break;
        default:
            if (value === '=') {
                if (numberOne === 0) {                    
                    break;
                } else {
                    numberTwo = +currentNumber.number;
                    display_value = operate(operation, numberOne, numberTwo);
                    numberTwo = 0;
                    numberOne = display_value;
                    currentNumber.number = '';
                    break;
                }
            }
            if (value === "C") {
                display_value = 0;
                currentNumber.number = '';
                numberOne = 0;
                numberTwo = 0;
                operation = '';
            } else if (value === '.') {
                if (lastValue === 'operator') {
                    display_value = '0.';
                    currentNumber.number = '0.';
                } else if (currentNumber.hasDot()) {
                    break;
                } else {
                    display_value += value;
                    currentNumber.number += value;
                }
            } else if (isOperator(value)) {
                if (!numberOne) {
                    numberOne = +currentNumber.number;
                } else if (numberOne && !numberTwo) {
                    numberTwo = +currentNumber.number;
                    display_value = operate(operation, numberOne, numberTwo);
                    numberTwo = 0;
                    numberOne = display_value;
                }
                operation = value;
                lastValue = "operator";
                currentNumber.number = '';
            } else {
                if (lastValue === 'operator') {
                    display_value = value;
                } else {
                    display_value += value;
                }
                currentNumber.number += value;
                lastValue = 'digit';
            }
    }

    display.textContent = display_value;
}


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

function operate(operation, a, b) {
    let result;
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
    }
    return result;
}

function isOperator(value) {
    const operations = ['+', '-', '/', '*'];
    return operations.includes(value);
}