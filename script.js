const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const negativeButton = document.querySelector('[data-negative]');
const calculatorStore = document.querySelector('[data-previous-operand]');
const calculatorText = document.querySelector('[data-current-operand]');

let operator = '';
let previousOperand = '';
let currentOperand = '';
let equalsOperator = false;

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

function changeNegative () {
   currentOperand = (-(parseFloat(currentOperand))).toString();
}

function appendNumber(number) {
   if (number === '.' && currentOperand.includes('.')) return;
   if (currentOperand.length < 12) currentOperand += number;
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

function getDisplayNumber(number) {
   const stringNumber = number.toString();
   const integerDigits = parseFloat(stringNumber.split('.')[0]);
   const decimalDigits = stringNumber.split('.')[1];
   let integerDisplay;
   if (isNaN(integerDigits)) {
      integerDisplay = '';
   } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
   }
   if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
   } else return integerDisplay;
}

function updateDisplay() {
   calculatorText.textContent = getDisplayNumber(currentOperand);
   calculatorStore.textContent = `${getDisplayNumber(previousOperand)} ${operator}`;
}

allClearButton.onclick = () => clear();

deleteButton.onclick = () => {
   deleteSymbol();
   updateDisplay();
}

negativeButton.onclick = () => {
   changeNegative();
   updateDisplay();
}

equalsButton.onclick = () => {
   operate();
   updateDisplay();
   equalsOperator = true;
}

numberButtons.forEach(button => button.addEventListener('click', () => {
   if (equalsOperator === true) {
      clear();
      equalsOperator = false;
   }
   appendNumber(button.textContent);
   updateDisplay();
}));

operatorButtons.forEach(button => button.addEventListener('click', () => {
   if (equalsOperator === true) equalsOperator = false;
   chooseOperator(button.textContent);
   updateDisplay();
}));