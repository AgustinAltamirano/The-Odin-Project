const displayInitialValue = "0";
const displayMaxLength = 12;

const operations = {
  "+": add,
  "-": substract,
  "*": multiply,
  "/": divide,
}

function add(n1, n2) {
  return n1 + n2;
}

function substract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(operator, n1, n2) {
  return operations[operator](n1, n2);
}

function main() {
  const calculatorStatus = {
    displayValue: displayInitialValue,
    firstOperand: NaN,
    secondOperand: NaN,
    currentOperator: undefined,
    currentOperandHasDecimalPoint: false,
  }

  const display = document.querySelector("#display");
  const buttonContainer = document.querySelector("#buttonContainer");
  display.textContent = calculatorStatus.displayValue;

  buttonContainer.addEventListener("click", event => {
    if (event.target.classList.contains("number")) {
      updateWhenNumberPressed(display, event.target, calculatorStatus);
    } else if (event.target.classList.contains("operator")) {
      updateWhenOperatorPressed(display, event.target, calculatorStatus);
    }
  })
}

function updateWhenNumberPressed(display, button, calculatorStatus) {
  if (calculatorStatus.displayValue.length === 12) {
    return;
  }
  if (button.value === ".") {
    if (calculatorStatus.currentOperandHasDecimalPoint) {
      return;
    }
    calculatorStatus.currentOperandHasDecimalPoint = true;
  } else if (calculatorStatus.displayValue === displayInitialValue) {
    calculatorStatus.displayValue = "";
  }
  calculatorStatus.displayValue += button.value;
  display.textContent = calculatorStatus.displayValue;
}

function updateWhenOperatorPressed (display, button, calculatorStatus) {
  const operatorPressed = button.value;
  if (isNaN(calculatorStatus.firstOperand)) {
    calculatorStatus.firstOperand = parseFloat(calculatorStatus.displayValue);
    calculatorStatus.currentOperator = operatorPressed;
    return;
  }
  calculatorStatus.secondOperand = parseFloat(calculatorStatus.displayValue);
}
main();