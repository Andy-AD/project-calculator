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
    
    switch(display_value) {
        case 0:
            if (isOperator(value) || value === "C" || value ==="=") {
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
                calculate(arrayOfOperations);
                currentNumber.number = '';
                arrayOfOperations = []; 
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
                    display_value = display_value.slice(0,-1) + value;
                } else {
                    display_value += value;
                }
                lastValue = "operator";
                currentNumber.number === '' ? 
                                            arrayOfOperations.pop().push(value) : 
                                            arrayOfOperations.push(currentNumber.number,value); 
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
    console.log(value);
}

function add(a , b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a , b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
     switch(operation) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a/b);
     }
}

function isOperator(value) {
    const operations = ['+', '-', '/', '*'];
    return operations.includes(value);
}