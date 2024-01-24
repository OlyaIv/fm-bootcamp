let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)){ 
        // is not a number
        handleSymbol(value);
    } else {
        // is a number
        handleNumber(value);
    }
    screen.innerText = buffer;

}

function handleSymbol(symbol) {
    // if (symbol === 'C'){
    //     buffer = "0";
    //     runningTotal = 0;
    // }

    // EXAMPLE WITH SWITCH STATEMENT
    switch(symbol){
        case 'C':
            buffer = "0";
            runningTotal = 0;
        break;
        case '=':
            if (previousOperator === null){
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
        break;
        case '←':
            if (buffer.length === 1){
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length -1 )
            }
        break;
    case '+':
    case '÷': // division
    case '×': // multiplication
    case '-': // subtraction
        handleMath(symbol);
        break;   
    }
}

function handleMath(symbol) {
    if (buffer === '0'){
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer); // or +buffer will do the thing as well to parse the string into a number

    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    
    buffer = "0";
 }

 function flushOperation(intBuffer) {
     if (previousOperator === '+'){
         runningTotal += intBuffer;
     } else if (previousOperator === '−'){ // −
         runningTotal -= intBuffer;
     } else if (previousOperator === '×'){
         runningTotal *= intBuffer;
     } else {
         runningTotal /= intBuffer;
     }
 }

//same as above with switch 
//  function flushOperation(intBuffer) {
//     switch(previousOperator){
//      case '+':
//          runningTotal += intBuffer;
//          break;  
//      case '−': 
//          runningTotal -= intBuffer;
//          break;
//      case '×':
//          runningTotal *= intBuffer;
//          break;
//      case '÷':
//          runningTotal /= intBuffer;
//          break;
//     }
// }


function handleNumber(numberString) { // string is used to display numbers on the screen, that's why it's a string
    if(buffer === "0"){
        buffer = numberString
    }else {
        buffer += numberString // buffer = buffer + numberString
    }
}

function init() {}
    document.querySelector('.calc-buttons').addEventListener('click', function(event)
    { 
        buttonClick(event.target.innerText);
     })



init();