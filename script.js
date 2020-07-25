const msgElement = document.getElementById('msg');

const randomNumber = getRandomNumber();

console.log('Number:', randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition;

//start recognition
recognition.start();

//capture user speech
function onSpeak(event) {
    const msg = event.results[0][0].transcript;
    
    writeMessage(msg);
    checkNumber(msg);
    
}

//display user speech
function writeMessage(msg) {
    msgElement.innerHTML = `<div> You said: </div>
    <span class="box">${msg}</span>`;    
}

//check message against number
function checkNumber(msg) {
    const num = +msg; //converts string to a number
    if(Number.isNaN(num)) {
        msgElement.innerHTML += '<div>That is not a valid number.</div>';
        return;
    }

    //check no in range
    if(num > 100 || num < 1) {
        msgElement.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    //check number success
    if(num === randomNumber) {
        document.body.innerHTML = `<h2>Congrats! You have guessed the number! <br>
        <br> It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>`;
    } else if(num > randomNumber) {
        msgElement.innerHTML += '<div>Go Lower</div>';
    } else if(num < randomNumber) {
        msgElement.innerHTML += '<div>Go Higher</div>';
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener('result', onSpeak);

//end recog service
recognition.addEventListener('end', () => recognition.start());

//play again button
document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});

