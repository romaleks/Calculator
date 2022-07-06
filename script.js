function addNumbers(numOne, numTwo) {
   if ((numOne + numTwo).toString().length > 12) {
      return Number.parseFloat(numOne + numTwo).toExponential(2);
   }
   return numOne + numTwo;
}

function subtractNumbers(numOne, numTwo) {
   if ((numOne - numTwo).toString().length > 12) {
      return Number.parseFloat(numOne - numTwo).toExponential(2);
   }
   return numOne - numTwo;
}

function multiplyNumbers(numOne, numTwo) {
   if ((numOne * numTwo).toString().length > 12) {
      return Number.parseFloat(numOne * numTwo).toExponential(2);
   }
   return numOne * numTwo;
}

function divideNumbers(numOne, numTwo) {
   if (numTwo == '0') {
      return 'ERROR';
   }
   return parseFloat((numOne / numTwo).toFixed(12));
}

function changePosNeg(number) {
   return -number;
}

function makeDecimal(number) {
   return `${number}.`
}

function clear() {
   calculatorText.textContent = '';
   calculatorStore.textContent = '';
   firstNumber = '';
   secondNumber = '';
   firstOperator = '';
   secondOperator = '';

}

function deleteSymbol() {
   calculatorText.textContent = `${calculatorText.textContent.slice(0, -1)}`;
   if (calculatorText.textContent === '-') calculatorText.textContent = '';
}

function operate(numOne, numTwo, operator) {
   if (operator === '+') return addNumbers(numOne, numTwo);
   else if (operator === '−') return subtractNumbers(numOne, numTwo);
   else if (operator === '×') return multiplyNumbers(numOne, numTwo);
   else return divideNumbers(numOne, numTwo);
}

const buttons = document.querySelectorAll('.calculator__button');
const calculatorText = document.querySelector('.calculator__text')
const calculatorStore = document.querySelector('.calculator__store')
let firstNumber = '';
let secondNumber = '';
let firstOperator = '';
let secondOperator = '';

buttons.forEach((button) => {
   button.addEventListener('click', (e) => {
      if (calculatorText.textContent == 'ERROR') {
         calculatorText.textContent = '';
         firstNumber = '';
         secondNumber = '';
         firstOperator = '';
         secondOperator = '';
      }

      if (firstOperator !== '') {
         if (button.textContent >= '0' && button.textContent <= '9' &&
            calculatorText.textContent.length < 13) {
            calculatorText.textContent += button.textContent;
            secondNumber += button.textContent;
         } else if (secondNumber == '') {
            if (button.textContent === 'AC') clear();
            return;
         };

         if ((button.textContent < '0' || button.textContent > '9') &&
            button.textContent != '+/−' &&
            button.textContent != '.' &&
            button.textContent != 'AC' &&
            button.textContent != 'DEL' &&
            button.textContent != '=') {
               secondOperator = button.textContent;
               if (button.textContent < '0' || button.textContent > '9') {
                  calculatorStore.textContent =
                     `${operate(+firstNumber, +secondNumber, firstOperator)} ${secondOperator}`;
                  if (calculatorStore.textContent.includes('ERROR')) {
                     calculatorStore.textContent = '';
                     calculatorText.textContent = 'ERROR';
                  } else {
                     calculatorText.textContent = '';
                     firstNumber = operate(+firstNumber, +secondNumber, firstOperator);
                     secondNumber = '';
                     firstOperator = secondOperator;
                     secondOperator = '';
                  }
               }
            }
      } else {
         if (secondOperator === '=' && firstNumber === '' && firstOperator !== '') calculatorText.textContent = '';

         if (button.textContent >= '0' && button.textContent <= '9' &&
            calculatorText.textContent.length < 13) {
            firstNumber += button.textContent;
            calculatorText.textContent += button.textContent;
         }

         if ((button.textContent < '0' || button.textContent > '9') &&
            button.textContent != '+/−' &&
            button.textContent != '.' &&
            button.textContent != 'AC' &&
            button.textContent != 'DEL' &&
            button.textContent != '=' &&
            calculatorText.textContent != '') firstOperator = button.textContent;

         if (firstOperator !== '') {
            firstNumber = calculatorText.textContent;
            calculatorText.textContent = '';
            calculatorStore.textContent = `${firstNumber} ${firstOperator}`;
         }
      }

      if (button.textContent === '=' && secondNumber != '') {
         calculatorText.textContent =
            `${operate(+firstNumber, +secondNumber, firstOperator)}`;
         calculatorStore.textContent = '';
         firstNumber = '';
         secondNumber = '';
         firstOperator = '';
         secondOperator = '=';
      }
      else if (button.textContent === '+/−' && calculatorText.textContent != '') calculatorText.textContent =
         `${changePosNeg(calculatorText.textContent)}`;
      else if (button.textContent === '.' && !calculatorText.textContent.includes('.')) {
         calculatorText.textContent =
            `${makeDecimal(calculatorText.textContent)}`;
         firstNumber = calculatorText.textContent;
      }
      else if (button.textContent === 'AC') clear();
      else if (button.textContent === 'DEL') deleteSymbol();
   });
});