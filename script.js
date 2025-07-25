const display = document.getElementById('display');
let currentInput = '';
let lastResult = null;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    lastResult = null;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        // Replace symbols with JS operators
        let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        // Evaluate expression safely
        let result = Function('"use strict";return (' + expression + ')')();
        lastResult = result;
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        currentInput = 'Error';
        updateDisplay();
        currentInput = '';
    }
}

function appendOperator(operator) {
    if (currentInput === '' && operator !== '-') return; // allow negative numbers
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '×', '÷', '−'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        const action = button.getAttribute('data-action');

        if (number !== null) {
            appendNumber(number);
        } else if (action !== null) {
            switch (action) {
                case 'clear':
                    clearDisplay();
                    break;
                case 'backspace':
                    backspace();
                    break;
                case 'equals':
                    calculate();
                    break;
                case 'add':
                    appendOperator('+');
                    break;
                case 'subtract':
                    appendOperator('−');
                    break;
                case 'multiply':
                    appendOperator('×');
                    break;
                case 'divide':
                    appendOperator('÷');
                    break;
            }
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('−');
    } else if (key === '*') {
        appendOperator('×');
    } else if (key === '/') {
        appendOperator('÷');
    }
});
