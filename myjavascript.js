let display_value = 0;
let lastValue = '';
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});

function populateDisplay(event) {
    const operations = ['+', '-', '/', '*'];
    let value = event.target.innerText;
    if (value === "=") {
        calculate(display_value);
    } else if (value === "C") {
        display_value = 0;
    } else if (operations.includes(value)) {
        if (!display_value) {
            return;
        } else if (lastValue === 'operator') {
            display_value = display_value.slice(0,-1) + value;
        } else {
            display_value += value;
        }
        lastValue = "operator";
    } else if (display_value) {
        display_value += value;
    } else {
        display_value = value;
    }
    display.textContent = display_value;
}

function calculate(value) {
    let values = value.split(operationsRegExp);
    console.log(values);
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