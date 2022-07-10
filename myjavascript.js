let display_value = 0;
let lastValue = '';
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
            if (value === "=") {
                arrayOfOperations.push(currentNumber.number);
                display_value = calculate(arrayOfOperations);
                currentNumber.number = '';
                arrayOfOperations = [];
                break;
            } else if (value === "C") {
                display_value = 0;
                currentNumber.number = '';
                arrayOfOperations = [];
            } else if (value === '.') {
                if (lastValue === 'operator') {
                    display_value += '0.';
                    currentNumber.number = '0.';
                } else if (currentNumber.hasDot()) {
                    break;
                } else {
                    display_value += value;
                    currentNumber.number += value;
                }
            } else if (isOperator(value)) {
                if (lastValue === 'operator') {
                    display_value = display_value.slice(0, -1) + value;
                } else {
                    display_value += value;
                }
                lastValue = "operator";
                currentNumber.number === '' ?
                    arrayOfOperations.pop().push(value) :
                    arrayOfOperations.push(currentNumber.number, value);
                currentNumber.number = '';
            } else {
                display_value += value;
                currentNumber.number += value;
                lastValue = 'digit';
            }
    }
    display.textContent = display_value;
}

function calculate(value) {
    let multiplicationIndex = value.indexOf('*');
    let divisionIndex = value.indexOf('/');
    while (multiplicationIndex > 0 || divisionIndex > 0) {
        if (multiplicationIndex < 0) {
            value = operate('/',divisionIndex,value);
        } else if (divisionIndex < 0) {
            value = operate('*', multiplicationIndex, value);
        } else {
            multiplicationIndex < divisionIndex ? value = operate('*', multiplicationIndex, value)                                
                                                : value = operate('/', divisionIndex,value);
        }
        multiplicationIndex = value.indexOf('*');
        divisionIndex = value.indexOf('/');
    }
    while (value.length !== 1) {
        value = operate(value[1], 1, value);
    }
    return value[0];
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

function operate(operation, index, array) {
    let result;
    let a = +array[index - 1];
    let b = +array[index + 1];
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
    array.splice(index - 1, 3, result);
    return array;
}

function isOperator(value) {
    const operations = ['+', '-', '/', '*'];
    return operations.includes(value);
}