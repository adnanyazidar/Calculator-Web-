let jumlahPerhitungan = 0;
let buffer = "0";
let previousOperator = null;
let decimalAdded = false;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  if (buffer.length > 10) {
    screen.style.fontSize = "1.5rem";
  } else if (buffer.length > 5) {
    screen.style.fontSize = "2.5rem";
  } else {
    screen.style.fontSize = "3.5rem";
  }

  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "AC":
      buffer = "0";
      jumlahPerhitungan = 0;
      decimalAdded = false;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = jumlahPerhitungan.toString();
      jumlahPerhitungan = 0;
      decimalAdded = false;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMeth(symbol);
      break;
  }
}

function handleMeth(symbol) {
  if (buffer === "0") {
    return;
  }

  const floatBuffer = parseFloat(buffer);

  if (jumlahPerhitungan === 0) {
    jumlahPerhitungan = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
  decimalAdded = false;
}

function flushOperation(floatBuffer) {
  if (previousOperator === "+") {
    jumlahPerhitungan += floatBuffer;
  } else if (previousOperator === "−") {
    jumlahPerhitungan -= floatBuffer;
  } else if (previousOperator === "×") {
    jumlahPerhitungan *= floatBuffer;
  } else if (previousOperator === "÷") {
    jumlahPerhitungan /= floatBuffer;
  }
}

function handleNumber(number) {
  if (buffer.length >= 12) {
    return;
  }

  if (number === ".") {
    if (!decimalAdded) {
      buffer += ".";
      decimalAdded = true;
    }
    return;
  }

  if (buffer === "0") {
    buffer = number.toString();
  } else {
    buffer += number.toString();
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
