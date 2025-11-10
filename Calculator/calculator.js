const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            appendNumber(value);
        } else if (button.classList.contains('operator')) {
            chooseOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        } else if (value === '⌫') {
            deleteLast();
        }
    });
});

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}