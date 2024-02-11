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