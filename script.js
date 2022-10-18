const screen = document.querySelector('.screen');
const buttons = document.getElementById('buttons');
screen.textContent = 0;
let contentOnScreen = '';
let operator = '+';
let result = '';


buttons.addEventListener('click', e => {
    const mouseCode = e.target.dataset.target
    userTyping(mouseCode)
})

window.addEventListener('keyup', e => {
    const keyboardCode = document.querySelector(`button[data-target="${e.key}"]`).dataset.target;
    userTyping(keyboardCode)
})

const userTyping = (buttonCode) => {
    if (!isNaN(buttonCode) || buttonCode === '.') {
        contentOnScreen.startsWith(0, 0) ? contentOnScreen = '' : contentOnScreen;
        if (contentOnScreen.length < 10) {
            contentOnScreen += buttonCode;
            contentOnScreen.split('.').length - 1 < 2 ? screen.textContent = contentOnScreen
                : contentOnScreen = contentOnScreen.slice(0, -1);
        }
    } else if (buttonCode === 'Backspace') {
        contentOnScreen = contentOnScreen.slice(0, -1);
        contentOnScreen === '' ? screen.textContent = 0 : screen.textContent = contentOnScreen;
    } else if (buttonCode === 'Escape') {
        screen.textContent = 0;
        contentOnScreen = '';
        operator = '+';
        result = '';
    } else if (buttonCode === '%') {
        contentOnScreen = operation(result, buttonCode, contentOnScreen);
        screen.textContent = roundUp(contentOnScreen);
        result = operation(result, operator, contentOnScreen)
        contentOnScreen = '';
    } else if (buttonCode === '√') {
        contentOnScreen = operation(result, buttonCode, contentOnScreen);
        screen.textContent = roundUp(contentOnScreen);
        result = operation(result, operator, contentOnScreen);
        contentOnScreen = '';
    } else {
        result = operation(result, operator, contentOnScreen);
        screen.textContent = roundUp(result);
        operator = buttonCode;
        contentOnScreen = '';
    }
}

const operation = (a, b, c) => {
    if (b === '+') {
        a = +c + +a;
    }
    if (b === '-') {
        a -= c;
    }
    if (b === 'x') {
        a *= c;
    }
    if (b === '/') {
        if (c === 0) {
            return 'no can do'
        } else {
            a = a / c;
        }
    }
    if (b === '√') {
        c === '' ? a = Math.sqrt(a) : a = Math.sqrt(c);
    }
    if (b === '%') {
        a = a * c / 100;
    }
    if (b === 'Enter') {
        c === '' ? a = a : a = c;
    }

    return a;
}


function roundUp(numberToRound) {
    overDigits = numberToRound.toString().slice(10)
    overDigitsTransformed = 'e' + overDigits.length
    baseNumber = numberToRound.toString()
    if (baseNumber.length > 10) {
        numberToRound = baseNumber.slice(0, 10) + overDigitsTransformed
        return numberToRound
    } else { return numberToRound };

}

