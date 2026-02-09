let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = '';
let history = [];

// Number or decimal input
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

// Operator
function setOperator(op) {
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        return;
    }
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Calculate
function calculate() {
    if (currentInput === '' || previousInput === '' || operator === null) return;

    let result = operate(operator, parseFloat(previousInput), parseFloat(currentInput));
    addHistory(previousInput, currentInput, operator, result);

    currentInput = result.toString();
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Clear
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Update display
function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

// Operate
function operate(op, a, b) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 0;
    }
}

// Add history to div
function addHistory(a, b, op, result) {
    let record = `${a} ${op} ${b} = ${result}`;
    history.push(record);

    // Show in history div
    let historyList = document.getElementById('historyList');
    let li = document.createElement('li');
    li.textContent = record;
    historyList.prepend(li); // latest on top
}

// Toggle history div
function toggleHistory() {
    let historyDiv = document.getElementById('historyDiv');
    if (historyDiv.style.display === 'none') {
        historyDiv.style.display = 'block';
    } else {
        historyDiv.style.display = 'none';
    }
}
