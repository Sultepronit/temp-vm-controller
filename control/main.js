// import sendCommand from "./sendCommand.js";

const history = document.getElementById('history');
const previousCommands = document.getElementById('previous-commands');
const theInput = document.getElementById('the-input');

function newLine() {
    history.innerHTML += `<b><span class="comp-green">step@vm</span>:~$ </b>`;
    history.scrollTop = history.scrollHeight;
}

function prepareTheReceivedText(input) {
    let edited = input.replaceAll('\u001b', '');
    edited = edited.replaceAll('[31m', '<span class="red">');
    edited = edited.replaceAll('[33m', '<span class="yellow">');
    edited = edited.replaceAll('[0m', '</span>');
    return edited;
}

function addResponse(response) {
    const prepared = prepareTheReceivedText(response);
    // history.innerHTML += `<p>${prepared}</p>`;
    // history.innerHTML += `<pre>${prepared}</pre>`;
    const presp = document.createElement('p');
    presp.innerText = prepared;
    history.appendChild(presp);
    // history.scrollTop = history.scrollHeight;
    newLine();
}

function addCommand(command) {
    history.innerHTML += `<b>${command}</b>`;
    history.scrollTop = history.scrollHeight;

    sendCommand(command).then((response) => {
        addResponse(response);
    });
}

theInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter' && !event.shiftKey) {
        const command = previousCommands.value ? 
            previousCommands.value + '\n' + theInput.value : theInput.value;
        // addCommand(theInput.value);
        addCommand(command);
        theInput.value = '';
        manageHeights();
    }
});

const windowHeight = window.innerHeight;
function manageHeights() {
    theInput.style.height = 'auto';
    theInput.style.height = theInput.scrollHeight + 2 + 'px';

    previousCommands.style.height = 'auto';
    previousCommands.style.height = previousCommands.scrollHeight + 2 + 'px';

    const inputsHeight = theInput.scrollHeight + previousCommands.scrollHeight;
    history.style.height = (windowHeight - 70 - inputsHeight) + 'px';
}

theInput.addEventListener('input', () => manageHeights());
previousCommands.addEventListener('input', () => manageHeights());

document.getElementById('clear-prev')
    .addEventListener('click', () => {
        previousCommands.value = '';
        theInput.focus();
    });

document.getElementById('statuses-button')
    .addEventListener('click', () => addCommand('./statuses'));
document.getElementById('pull-button')
    .addEventListener('click', () => addCommand('./pull'));
document.getElementById('pushdb-button')
    .addEventListener('click', () => addCommand('./pushdb'));

theInput.focus();
manageHeights();
newLine();