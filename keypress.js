let button;

function simulatePress (e) {
    key = e.key;
    if (e.key === 'Enter' || e.key === '=') {
            button = document.querySelector('.equal');
            button.click();
        }
        else if (e.key === '+') {
            button = document.querySelector('#add');
            button.click();
        }
        else if (e.key === '-') {
            button = document.querySelector('#subtract');
            button.click();
        }
        else if (e.key === '*') {
            button = document.querySelector('#multiply');
            button.click();
        }
        else if (e.key === '/') {
            button = document.querySelector('#divide');
            button.click();
        }
        else if (e.key === '.') {
            button = document.querySelector('#dot');
            button.click();
        }
        else if (e.key === 'Backspace') {
            button = document.querySelector('#backspace');
            button.click();
        }
        else if (e.key === 'Escape') {
            button = document.querySelector('#clear');
            button.click();
        }
        else {
            try {
                button = document.querySelector(`#key-${key}`);
                button.click();
            }
            catch(err) {
                console.log(key);
            }
        }


    
}
