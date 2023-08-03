let numberL;
let numberR;
let operator;
let result;
let tempStr;
let equalPressed;

const resultDisplay = document.querySelector('.display');
const equationDisplay = document.querySelector('.equation'); 
const clearButton = document.querySelector('#clear');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.mdas');
const equalButton = document.querySelector('.equal');
const signButton = document.querySelector('#sign');

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
        numberR = parseFloat(tempStr);
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
    }

    resultDisplay.textContent = result;
    equationDisplay.textContent = equation;
    numberR = '';
    equalPressed = false;

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
    let char = e.target.textContent;
    if (char === '.' && (tempStr.length === 0 || tempStr === '-'))
        tempStr += '0.';
    else if (char !== '.' || !(tempStr.includes('.')))
        tempStr += char;
    resultDisplay.textContent = parseFloat(tempStr);
}

function updateSign() {
    let valueDisplayed = tempStr;

    if (!equalPressed)
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
        console.log(`L: ${numberL}, R: ${numberR}, temp: ${tempStr}`)  
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
}

function initCalculator() {
    clearScreen();

    clearButton.addEventListener('click', clearScreen);
    numberButtons.forEach(button => button.addEventListener('click', getNumber));
    operationButtons.forEach(button => button.addEventListener('click', setOperator));
    equalButton.addEventListener('click', equalEvaluate);
    signButton.addEventListener('click', updateSign);
}

initCalculator();

