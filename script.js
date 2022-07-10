const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const calculatorStore = document.querySelector('[data-previous-operand]');
const calculatorText = document.querySelector('[data-current-operand]');

let operator;
let previousOperand = '';
let currentOperand = '';

function clear() {
   calculatorText.textContent = '';
   calculatorStore.textContent = '';
   operator = undefined;
}

function appendNumber(number) {
   if (currentOperand.length < 13) currentOperand += number;
}

function updateDisplay() {
   calculatorText.textContent = currentOperand;
}

numberButtons.forEach(button => button.addEventListener('click', () => {
   appendNumber(button.textContent);
   updateDisplay();
}));