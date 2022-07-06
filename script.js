function addNumbers(numOne, numTwo) {
   return numOne + numTwo;
}

function subtractNumbers(numOne, numTwo) {
   return numOne - numTwo;
}

function multiplyNumbers(numOne, numTwo) {
   return numOne * numTwo;
}

function divideNumbers(numOne, numTwo) {
   return numOne / numTwo;
}

function changePosNeg(number) {
   return -number;
}

function operate(numOne, numTwo, operator) {
   if (operator === '+') return addNumbers(numOne, numTwo);
   else if (operator === '−') return subtractNumbers(numOne, numTwo);
   else if (operator === '×') return multiplyNumbers(numOne, numTwo);
   else return divideNumbers(numOne, numTwo);
}