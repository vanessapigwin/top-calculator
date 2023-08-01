let numberL = 1;
let numberR = 0;
let operator = "add";

const operations = {
    add: {
        symbol: '+',
        calculate: (x, y) => x + y 
    },
    subtract: {
        symbol: '-',
        calculate: (x, y) => x - y 
    },
    multiply: {
        symbol: 'x',
        calculate: (x, y) => x * y
    },
    divide: {
        symbol: '/',
        calculate: function (x, y) {
            if (y === 0) {
                alert('division by 0');
            }
            return x / y;
        }
    } 
};

function operate(numberL, operator, numberR) {
    let symbol = operations[operator].symbol;
    let equation = `${numberL} ${symbol} ${numberR}`;
    let result = operations[operator].calculate(numberL, numberR);
    const resultDisplay = document.querySelector('.display');
    const equationDisplay = document.querySelector('.equation'); 

    resultDisplay.textContent = result;
    equationDisplay.textContent = equation;

    return result;
}

result = operate(numberL, operator, numberR);
console.log(result);
