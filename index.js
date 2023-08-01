let numberL;
let numberR;
let operator;
let result;

const resultDisplay = document.querySelector('.display');
const equationDisplay = document.querySelector('.equation'); 
const clearButton = document.querySelector('#clear');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.mdas');
const equalButton = document.querySelector('.equal');

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
            if (y === '0') {
                return "ERROR";
            } else
                return x / y;
        }
    } 
};

function evaluateFunction() {
    let result;
    let equation;

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

    return result;
}

function clearScreen() {
    numberL = '';
    numberR = '';
    dummyStr = '';
    operator = undefined;
    result = undefined;
    resultDisplay.textContent = 0;
    equationDisplay.textContent = '';
}

function getNumber(e) {
    let char = e.target.textContent; 
    if (result === undefined && operator === undefined) {
        if (char === '.' && numberL.length === 0)
            numberL += '0.';
        else if (!numberL.includes('.') || char !== '.')
            numberL += char
        resultDisplay.textContent = numberL;
    }
    else {
        if (char === '.' && numberL.length === 0)
            numberR += '0.';
        else if (!numberR.includes('.') || char !== '.')
            numberR += char
        resultDisplay.textContent = numberR;
    }

    console.log(`L: ${numberL} ope: ${operator}, R: ${numberR}`)
}

function setOperator(e) {
    if (numberL !== '' && numberR !== '' && operator !== undefined) {
        result = evaluateFunction();
        numberR = '';
    }

    if (numberL !== '')
        operator = e.target.id;

    if (result !== undefined)
        numberL = result;
    
    console.log(`L: ${numberL} ope: ${operator}, R: ${numberR}`)
}

function initCalculator() {
    clearScreen();

    clearButton.addEventListener('click', clearScreen);
    numberButtons.forEach(button => button.addEventListener('click', getNumber));
    operationButtons.forEach(button => button.addEventListener('click', setOperator));
    equalButton.addEventListener('click', evaluateFunction);
}

initCalculator();

