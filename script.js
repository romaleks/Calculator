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

function clear() {  // Clear all calculator's display
   calculatorText.textContent = '';
   calculatorStore.textContent = '';
   previousOperand = '';
   currentOperand = '';
   operator = '';
}

function deleteSymbol() {  // Delete one symbol of current operand
   // Check if the operand have '-' and one symbol and clear the display if it is
   if (currentOperand.length === 2 && currentOperand.includes('-')) {
      currentOperand = '';
   }
   currentOperand = currentOperand.toString().slice(0, -1);
}

function changeNegative() {  // Make negative operand out of positive and on the contrary
   currentOperand = (-(parseFloat(currentOperand))).toString();
}

function appendNumber(number) {  // Append a number to current operand
   if (number === '.' && currentOperand.includes('.')) return;  // Don't allow to append more than 1 dot
   if (currentOperand.length < 13) currentOperand += number;
}

function chooseOperator(oper) {  // Choose the operator
   if (currentOperand === '') return; // Don't allow to choose operator while current operand is empty
   if (previousOperand !== '') {
      operate();
   }
   operator = oper;
   previousOperand = currentOperand;
   currentOperand = '';
}

function operate() {  // Calculates the expression
   let result;
   const prev = parseFloat(previousOperand);
   const curr = parseFloat(currentOperand);
   switch (operator) {
      case '+':
         result = parseFloat((prev + curr).toPrecision(12));
         break;
      case '−':
         result = parseFloat((prev - curr).toPrecision(12));
         break;
      case '×':
         result = parseFloat((prev * curr).toPrecision(12));
         break;
      case '÷':
         result = parseFloat((prev / curr).toPrecision(12));
         break;
      default:
         return;
   }
   currentOperand = result;
   operator = '';
   previousOperand = '';
}

function getDisplayNumber(number) {  // Make integer part more readable
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

function updateDisplay() {  // Updates the display
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