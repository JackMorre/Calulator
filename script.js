const mainText = document.querySelector(".calc_text");
const btns = document.querySelectorAll(".btn");
let textValue = "";
let firstValue = "";
let secondValue = "";
let opValue = "";

const opArr = ["*", "-", "+", "/"];

const updateTextValue = function (number) {
	mainText.textContent = number;
};

btns.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		const input = e.target.getAttribute("data-type");
		console.log(input);
		if (isNumeric(input) === true) {
			console.log("1");
			textValue += input;
			updateTextValue(textValue);
		}
		if (opArr.includes(input) === true) {
			console.log("2");
			firstValue = textValue;
			opValue = input;
		}
		if (firstValue >= "0" && isNumeric(input) === true) {
			console.log("3");
			textValue = "";
			textValue += input;
			updateTextValue(textValue);
		}
		if (input === "=") {
			console.log("4");
			secondValue = textValue;
			operate(firstValue, secondValue, opValue);
		}
	});
});

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = function (num1, num2, op) {
	switch (op) {
		case "/":
			console.log(divide(num1, num2));
			break;
		case "*":
			console.log(multiply(num1, num2));
			return;
			break;
		case "+":
			console.log(add(num1, num2));
			break;
		case "-":
			console.log(subtract(num1, num2));
			break;
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
