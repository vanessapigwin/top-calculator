let numberL;
let numberR;
let operator;
let result;
let tempStr;
let equalPressed;

const SCREENLIMIT = 10;
const resultDisplay = document.querySelector('.display');
const equationDisplay = document.querySelector('.equation'); 
const clearButton = document.querySelector('#clear');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.mdas');
const equalButton = document.querySelector('.equal');
const signButton = document.querySelector('#sign');
const backspace = document.querySelector('#backspace');

const operations = {
    add: {
        symbol: '+',
        calculate: (x, y) => parseFloat(x) + parseFloat(y) 
    },
    subtract: {
        symbol: '-',
        calculate: (x, y) => parseFloat(x) - parseFloat(y) 
    },
    multiply: {
        symbol: 'x',
        calculate: (x, y) => x * y
    },
    divide: {
        symbol: '/',
        calculate: function (x, y) {
            if (y == 0) {
                alert('Division by zero.');
                return "ERROR";
            } else
                return x / y;
        }
    } 
};

function equalEvaluate() {
    equalPressed = true;
    evaluateFunction();
}

function evaluateFunction() {
    let result;
    let equation;

    if (tempStr !== '' && tempStr !== '-' && numberL !== '-') {
        numberR = tempStr;
    } else
        clearScreen();

    if (!operator)
        tempStr = '';

    if (numberL === 'ERROR') {
        result = 'ERROR';
        equation = '';
    } else if (numberL !== '' && numberR !== '' && operator !== undefined) {
        let symbol = operations[operator].symbol;
        equation = `${numberL} ${symbol} ${numberR}`;
        result = operations[operator].calculate(numberL, numberR);
        
        if (result.toString().length > 11) {
            result = result.toExponential(2);
        }
    }
    resultDisplay.textContent = result;
    equationDisplay.textContent = equation;
    numberR = '';

    return result;
}

function clearScreen() {
    numberL = '';
    numberR = '';
    tempStr = '';
    operator = undefined;
    result = undefined;
    equalPressed = false;
    resultDisplay.textContent = '';
    equationDisplay.textContent = '';
}

function getNumber(e) {
    if (!equalPressed) {
        let char = e.target.textContent;
    if (char === '.' && (tempStr.length === 0 || tempStr === '-'))
        tempStr += '0.';
    else if (char === '0' && (tempStr === '0' || tempStr === '-0'))
        tempStr += '';
    else if (char !== '.' || !(tempStr.includes('.'))) {
        tempStr += char;
        if (tempStr.length > SCREENLIMIT)
            tempStr = tempStr.slice(tempStr.length - SCREENLIMIT);
    }
    resultDisplay.textContent = tempStr;
    } else 
        clearScreen();
}

function deleteEndNumber() {
    tempStr = tempStr.slice(0, tempStr.length-1);
    resultDisplay.textContent = tempStr;
    return tempStr;
}

function updateSign() {
    let valueDisplayed = tempStr;

    if (!equalPressed) {
        if (valueDisplayed !== ''|| valueDisplayed !== '-') {
            if (valueDisplayed[0] !== '-')
                valueDisplayed = '-'.concat(valueDisplayed);
            else
                valueDisplayed = valueDisplayed.slice(1);
            resultDisplay.textContent = valueDisplayed;
            tempStr = valueDisplayed;
        }
        else {
            tempStr += '-';
            resultDisplay.textContent = valueDisplayed;
            tempStr = valueDisplayed;
        }
    }
}

function setOperator(e) {
    equalPressed = false;

    if (numberL !== '' && operator !== undefined && tempStr != '') {
        numberR = tempStr;
        result = evaluateFunction();
    }

    if (numberL === '') {
        numberL = tempStr;
    }
    else {
        numberR = tempStr;
    }

    if (result !== undefined) {
        numberL = result;
        numberR = '';
    }
    
    operator = e.target.id;
    tempStr = '';
    let symbol = operations[operator].symbol;
    equation = `${numberL} ${symbol} ${numberR}`;
    equationDisplay.textContent = equation;
}

function switchTheme() {
    const calculatorArea = document.querySelector('.calc');
    const buttons = document.querySelectorAll('button');
    resultDisplay.classList.toggle('display-alt');
    calculatorArea.classList.toggle('calc-alt');
    buttons.forEach( button => button.classList.toggle('button-alt'));
}

function initCalculator() {
    clearScreen();
    clearButton.addEventListener('click', clearScreen);
    numberButtons.forEach(button => button.addEventListener('click', getNumber));
    operationButtons.forEach(button => button.addEventListener('click', setOperator));
    equalButton.addEventListener('click', equalEvaluate);
    signButton.addEventListener('click', updateSign);
    backspace.addEventListener('click', deleteEndNumber);
    document.addEventListener('keydown', simulatePress);
    clearButton.addEventListener('dblclick', switchTheme);
}

initCalculator();