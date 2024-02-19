const INITIAL_DISPLAY_VALUE = "0";
const MAX_DISPLAY_LENGTH = 10;
const MATH_ERROR_MESSAGE = "MATH ERROR";


const operations = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "*": (n1, n2) => n1 * n2,
  "/": (n1, n2) => n1 / n2,
}

const controlOperations = {
  "AC": resetCalculator,
  "BACKSPACE": eraseLastDigit,
  "+/-": getOppositeDisplayValue,
  "=": getResult,
}

function main() {
  const calculatorStatus = {
    displayValue: INITIAL_DISPLAY_VALUE,
    firstOperand: NaN,
    secondOperand: NaN,
    currentOperator: undefined,
    currentOperandHasDecimalPoint: false,
    clearDisplay: true,
  }

  const display = document.querySelector("#display");
  const buttonContainer = document.querySelector("#buttonContainer");
  display.textContent = calculatorStatus.displayValue;

  buttonContainer.addEventListener("click", event => {
    if (event.target.classList.contains("number")) {
      updateWhenNumberPressed(display, event.target, calculatorStatus);
    } else if (event.target.classList.contains("operator")) {
      updateWhenOperatorPressed(display, event.target, calculatorStatus);
    } else if (event.target.classList.contains("control")) {
      updateWhenControlPressed(display, event.target, calculatorStatus);
    }
  })
}

function updateWhenNumberPressed(display, button, calculatorStatus) {
  if (calculatorStatus.clearDisplay) {
    calculatorStatus.displayValue = INITIAL_DISPLAY_VALUE;
  }
  if (calculatorStatus.displayValue.length === MAX_DISPLAY_LENGTH) {
    return;
  }
  if (button.value === ".") {
    if (calculatorStatus.currentOperandHasDecimalPoint) {
      return;
    }
    calculatorStatus.currentOperandHasDecimalPoint = true;
  } else if (calculatorStatus.displayValue === INITIAL_DISPLAY_VALUE) {
    calculatorStatus.displayValue = "";
  }
  calculatorStatus.displayValue += button.value;
  calculatorStatus.clearDisplay = false;
  display.textContent = calculatorStatus.displayValue;
}

function updateWhenOperatorPressed(display, button, calculatorStatus) {
  if (calculatorStatus.displayValue === MATH_ERROR_MESSAGE) {
    return;
  }
  const operatorPressed = button.value;
  if (isNaN(calculatorStatus.firstOperand)) {
    calculatorStatus.firstOperand = parseFloat(calculatorStatus.displayValue);
  } else {
    calculatorStatus.secondOperand = parseFloat(calculatorStatus.displayValue);
    calculatorStatus.firstOperand = operate(calculatorStatus.currentOperator,
      calculatorStatus.firstOperand, calculatorStatus.secondOperand);
  }
  if (calculatorStatus.firstOperand === Infinity ||
    calculatorStatus.firstOperand === -Infinity ||
    isNaN(calculatorStatus.firstOperand)) {
    resetCalculator(display, calculatorStatus);
    calculatorStatus.displayValue = MATH_ERROR_MESSAGE;
  } else {
    calculatorStatus.displayValue = `${calculatorStatus.firstOperand}`;
    calculatorStatus.currentOperator = operatorPressed;
    calculatorStatus.currentOperandHasDecimalPoint = false;
    calculatorStatus.clearDisplay = true;
    calculatorStatus.secondOperand = NaN;
  }
  display.textContent = calculatorStatus.displayValue;
}

function updateWhenControlPressed(display, button, calculatorStatus) {
  controlOperations[button.value](display, calculatorStatus);
}

function operate(operator, n1, n2) {
  let result = operations[operator](n1, n2).toPrecision(MAX_DISPLAY_LENGTH);
  return formatNumber(result);
}

function resetCalculator(display, calculatorStatus) {
  calculatorStatus.displayValue = INITIAL_DISPLAY_VALUE;
  calculatorStatus.firstOperand = NaN;
  calculatorStatus.secondOperand = NaN;
  calculatorStatus.currentOperator = undefined;
  calculatorStatus.currentOperandHasDecimalPoint = false;
  calculatorStatus.clearDisplay = true;
  display.textContent = calculatorStatus.displayValue;
}

function eraseLastDigit(display, calculatorStatus) {
  if (calculatorStatus.displayValue === MATH_ERROR_MESSAGE) {
    return;
  }
  calculatorStatus.displayValue = calculatorStatus.displayValue.slice(
    0, calculatorStatus.displayValue.length - 1
  );
  if (calculatorStatus.displayValue.length === 0) {
    calculatorStatus.displayValue = INITIAL_DISPLAY_VALUE;
  }
  display.textContent = calculatorStatus.displayValue;
}

function getOppositeDisplayValue(display, calculatorStatus) {
  if (calculatorStatus.displayValue === MATH_ERROR_MESSAGE) {
    return;
  }
  let displayNumber = formatNumber(parseFloat(calculatorStatus.displayValue));
  calculatorStatus.displayValue = `${-displayNumber}`;
  display.textContent = calculatorStatus.displayValue;
}

function getResult(display, calculatorStatus) {
  if (calculatorStatus.clearDisplay || !calculatorStatus.currentOperator) {
    return;
  }
  calculatorStatus.secondOperand = parseFloat(calculatorStatus.displayValue);
  calculatorStatus.firstOperand = operate(calculatorStatus.currentOperator,
    calculatorStatus.firstOperand, calculatorStatus.secondOperand);
  if (calculatorStatus.firstOperand === Infinity ||
    calculatorStatus.firstOperand === -Infinity ||
    isNaN(calculatorStatus.firstOperand)) {
    resetCalculator(display, calculatorStatus);
    calculatorStatus.displayValue = MATH_ERROR_MESSAGE;
  } else {
    let result = `${calculatorStatus.firstOperand}`;
    resetCalculator(display, calculatorStatus);
    calculatorStatus.displayValue = result;
  }  
  display.textContent = calculatorStatus.displayValue;
}

function formatNumber(number) {
  let roundedNumber = Math.round(number);
  if (Math.abs(roundedNumber) >= 10**(MAX_DISPLAY_LENGTH)) {
    return parseFloat(number).toExponential();
  }
  if (roundedNumber == number) {
    return roundedNumber;
  }
  return parseFloat(+number);
}

main();