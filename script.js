const mainText = document.querySelector(".calc_text");
const btns = document.querySelectorAll(".btn");
const cancelAll = document.querySelector(".btn[data-type='ce']");

let textValue = "";
let firstValue = "";
let secondValue = "";
let opValue = "";

const opArr = ["*", "-", "+", "/"];

const updateTextValue = function (number) {
  console.log(number);
  mainText.textContent = number;
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const input = e.target.getAttribute("data-type");
    // press number - needs to add the number to either first value or second value. We need to determine what value you are changing. make sure it work with one '.'
    console.log(input);

    if (
      (isNumeric(input) === true && secondValue === "" && opValue === "") ||
      (input === "." && secondValue === "" && opValue === "")
    ) {
      updateNum(input);
      firstValue = textValue;
    } else if (opArr.includes(input) === true) {
      if (checkFilled() === true) {
        getSum();
        updateOp(input);
      } else {
        updateOp(input);
      }
    } else if (
      (firstValue >= "0" && isNumeric(input) === true && opValue !== "") ||
      (input === "." && firstValue >= "0" && opValue !== "")
    ) {
      updateNum(input);
      secondValue = textValue;
      console.log(firstValue, secondValue, opValue, textValue);
    } else if (input === "=") {
      if (checkFilled() === true) {
        getSum();
      } else {
        return;
      }
    }
  });
});

const cancelEverything = function (val) {
  textValue = val;
  firstValue = "";
  secondValue = "";
  opValue = "";
  updateTextValue(textValue);
};
cancelAll.addEventListener("click", cancelEverything(0));

const hasDecimal = function (num) {
  const result = num - Math.floor(num) !== 0;

  if (result) return true;
  else return false;
};

const updateOp = function (input) {
  opValue = input;
  textValue = "";
};

const updateNum = function (input) {
  if (hasDecimal(textValue) === true && input === ".") {
    return;
  } else {
    console.log(textValue, input);
    if (textValue === 0 || textValue === "error") {
      textValue = input;
    } else {
      textValue += input;
    }
    updateTextValue(textValue);
  }
};

const roundedNum = function (num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000;
};

console.log(roundedNum(123.736823568));

const getSum = function () {
  firstValue = roundedNum(operate(firstValue, secondValue, opValue));
  updateTextValue(firstValue);
  secondValue = "";
};

const checkFilled = function () {
  if (firstValue !== "" && secondValue !== "" && opValue !== "") return true;
  else return false;
};

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = function (num1, num2, op) {
  console.log(num1, num2, op);
  const mainNum = Number(num1);
  const secNum = Number(num2);
  if (mainNum == 0 || secNum == 0) {
    cancelEverything("error");
    return;
  }
  switch (op) {
    case "/":
      return divide(mainNum, secNum);
    case "*":
      return multiply(mainNum, secNum);
    case "+":
      return add(mainNum, secNum);
    case "-":
      return subtract(mainNum, secNum);
  }
};

const populateTextArea = function (num) {
  mainText.textContent = num;
};

const isNumeric = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num);

// const numTooStr = function (type) {
// 	console.log(typeof type, Number(type));
// 	if (typeof type == "number") {
// 		return type.toString();
// 	} else if (typeof type == "string") {
// 		return Number(type);
// 	}
// };
