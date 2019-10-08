/* exported displayWindow */
/* exported hideWindow */
/* exported chatClock */
/* exported chatBot */
/* exported applyOptions */

let username = 'Guest';
let mainColor;
let outerBackground;
let secondaryColor;
let textColor;
let otherTextColor;
let optionsBackground;
let buttonBackground;
let timeStore = '';

function getTime() {
    let currentTime = new Date();
    let minutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();
    let hours = currentTime.getHours() > 12 ? (currentTime.getHours() - 12) : currentTime.getHours();
    let ampm = currentTime.getHours() > 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
}

function displayTime() {
    let newTime = getTime();
    if (newTime != timeStore) {
        document.getElementById('CHAT_TIME').textContent = newTime;
        timeStore = newTime;
    }
}

function addMessage(botMessage = false) {
    let message = document.createElement('div');
    let paragraph = document.createElement('p');
    let image = document.createElement('img');
    let userDetails = document.createElement('span');
    let details = '';
    let text = '';
    if (botMessage) {
        image.src = 'https://avatars.dicebear.com/v2/female/kay.svg?options[mood][]=happy';
        text = document.createTextNode(botMessage);
        details = document.createTextNode(`Zentha - ${getTime()}`);
        message.className = 'botMessage';
    } else {
        image.src = 'https://avatars.dicebear.com/v2/identicon/mask.svg';
        chatBot(document.querySelector('textarea[name="bot input"]').value);
        text = document.createTextNode(document.querySelector('textarea[name="bot input"]').value);
        details = document.createTextNode(`${username} - ${getTime()}`);
        message.className = 'secondaryBackground';
        message.style['background-color'] = secondaryColor;
        document.querySelector('textarea[name="bot input"]').value = '';
    }
    userDetails.appendChild(details);
    message.appendChild(image);
    paragraph.appendChild(text);
    message.appendChild(paragraph);
    message.appendChild(userDetails);
    document.getElementById('MESSAGES').appendChild(message);
    document.getElementById('MESSAGES').scroll(0, document.getElementById('MESSAGES').scrollHeight);
}

function chatBot(userInput) {
    let message = '';
    let messageParse = userInput.split(' ');
    if (messageParse.length > 1) {
        messageParse.forEach((word, index) => {
            message += index !== 0 ? `+${encodeURIComponent(word)}` : encodeURIComponent(word);
        });
    } else {
        message += encodeURIComponent(messageParse[0]);
    }
    let chatBotID = '149928';
    let externalID = 'guest-1';
    let firstName = 'Guest';
    let apiKey = 'm6qMj6jrxOw4s1Dw';
    let Url = `https://www.personalityforge.com/api/chat/?apiKey=${apiKey}&chatBotID=${chatBotID}&message=${message}&externalID=${externalID}&firstName=${firstName}`;
    fetch(Url)
    .then(res => {return res.json();})
    .then(json => {addMessage(json.message.message);});  
}

function setColor(selector, property, color) {
    document.querySelectorAll(selector).forEach(element => {
        element.style[property] = color;
    });
}

function applyOptions() {
    switch(currentCategory) {
        case 'USERNAME':
            username = document.querySelectorAll('textarea[name="username"]')[0].value;
            break;
        case 'CHAT_COLORS':
            mainColor = document.querySelectorAll('input[name="main background"]')[0].value;
            outerColor = document.querySelectorAll('input[name="outer background"]')[0].value;
            secondaryColor = document.querySelectorAll('input[name="secondary background"]')[0].value;
            textColor = document.querySelectorAll('input[name="text color"]')[0].value;
            otherTextColor = document.querySelectorAll('input[name="other color"]')[0].value;
            optionsBackground = document.querySelectorAll('input[name="options background"]')[0].value;
            buttonBackground = document.querySelectorAll('input[name="button background"]')[0].value;
            setColor('.mainBackground', 'background-color', mainColor);
            setColor('.outerBackground', 'background-color', outerColor);
            setColor('.secondaryBackground', 'background-color', secondaryColor);
            setColor('.textColor', 'color', textColor);
            setColor('.otherTextColor', 'color', otherTextColor);
            setColor('#OPTIONS_WINDOW', 'background-color', optionsBackground);
            setColor('input[type="button"]', 'background-color', buttonBackground);
            break;
        default:
            console.log('Invalid Option');
    }
    hideWindow();
}

function displayWindow(category) {
    document.getElementById(category).style.display = 'block';
}

function hideWindow(category) {
    document.getElementById(category).style.display = 'none';
}

let chatClock = setInterval(displayTime, 1000);

window.addEventListener('DOMContentLoaded', () => {
    displayTime();
    //dragElement(document.getElementById('OPTIONS_WINDOW'));
    document.querySelector('textarea[name="bot input"]').addEventListener('keyup', event => {
        if (event.key == 'Enter') {
            addMessage();
        }
    });
});