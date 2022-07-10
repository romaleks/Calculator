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

function deleteSymbol() {
   currentOperand = currentOperand.slice(0, -1);
}

function appendNumber(number) {
   if (number === '.' && currentOperand.includes('.')) return;
   if (currentOperand.length < 13) currentOperand += number;
}

function chooseOperator(oper) {
   if (currentOperand === '') return;
   if (previousOperand !== '') {
      operate();
   }
   operator = oper;
   previousOperand = currentOperand;
   currentOperand = '';
}

function operate() {
   let result;
   const prev = parseFloat(previousOperand);
   const curr = parseFloat(currentOperand);
   switch (operator) {
      case '+':
         result = prev + curr;
         break;
      case '−':
         result = prev - curr;
         break;
      case '×':
         result = prev * curr;
         break;
      case '÷':
         result = prev / curr;
         break;
      default:
         return;
   }
   currentOperand = result;
   operator = '';
   previousOperand = '';
}

function updateDisplay() {
   calculatorText.textContent = currentOperand;
   calculatorStore.textContent = `${previousOperand} ${operator}`;
}

allClearButton.onclick = () => clear();

deleteButton.onclick = () => {
   deleteSymbol();
   updateDisplay();
}

equalsButton.onclick = () => {
   operate();
   updateDisplay();
}

numberButtons.forEach(button => button.addEventListener('click', () => {
   appendNumber(button.textContent);
   updateDisplay();
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
   chooseOperator(button.textContent);
   updateDisplay();
}));