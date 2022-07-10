const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const calculatorStore = document.querySelector('[data-previous-operand]');
const calculatorText = document.querySelector('[data-current-operand]');

let operator = '';
let previousOperand = '';
let currentOperand = '';

function clear() {
   calculatorText.textContent = '';
   calculatorStore.textContent = '';
   previousOperand = '';
   currentOperand = '';
   operator = '';
}

function appendNumber(number) {
   if (number === '.' && currentOperand.includes('.')) return;
   if (currentOperand.length < 13) currentOperand += number;
}

function chooseOperator(oper) {
   if (currentOperand === '') return;
   operator = oper;
   previousOperand = currentOperand;
   currentOperand = '';
}

function updateDisplay() {
   calculatorText.textContent = currentOperand;
   calculatorStore.textContent = `${previousOperand} ${operator}`;
}

allClearButton.onclick = () => clear();

numberButtons.forEach(button => button.addEventListener('click', () => {
   appendNumber(button.textContent);
   updateDisplay();
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
   chooseOperator(button.textContent);
   updateDisplay();
}));