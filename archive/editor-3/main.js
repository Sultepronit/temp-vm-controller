"use strict";

const simpleEditor = document.getElementById('simple-editor');
// const previousCommands = document.getElementById('previous-commands');
const fileName = document.getElementById('the-input');
const unsaved = document.getElementById('unsaved');

let currentModel = null;

function editFile(name, contents) {
    // simpleEditor.innerText = response;
    // simpleEditor.value = response;
    currentModel = editInMonaco(name, contents);
    fileName.value = name;
    console.log(currentModel);
}

const unsavedChanges = {
    add() {
        unsaved.style.backgroundColor = 'red';
    },
    remove() {
        unsaved.style.backgroundColor = '';
    }
}

setInterval(() => {
    // console.log(currentModel.isDirty());
    // console.log(currentModel.isDirty);
    currentModel?.onDidChangeContent((event) => {
        // console.log(event);
        console.log('changes!');
        // unsaved.innerText = '#';
        unsavedChanges.add();
    });
}, 1000);

function selectFile(fileName) {
    const postData = {
        file: fileName,
        action: 'getFile',
    }
    console.log(postData);
    // sendRequest(command).then((response) => {
    sendRequest(postData).then((response) => {
        // console.log(response);
        editFile(fileName, response);
    });
}

fileName.addEventListener('keyup', (event) => {
    if(event.key === 'Enter' && !event.shiftKey) {
        const command = fileName.value;
        // addCommand(theInput.value);
        selectFile(command);
        // theInput.value = '';
    }
});

const windowHeight = window.innerHeight;

function save() {
    console.log('saving');
    // console.log(simpleEditor.value);
    const postData = {
        file: fileName.value,
        action: 'saveFile',
        // contents: simpleEditor.value
        contents: monacoEditor.getValue()
    }
    console.log(postData);

    sendRequest(postData).then((response) => {
        unsavedChanges.remove();
    });
}

function toggleTerminal() {
    // console.log('toggling!');
    const terminal = document.querySelector('.terminal');
    // console.log(terminal);
    // terminal.style.display = 'block';
    terminal.style.display = terminal.style.display == 'none' ? 'block' : 'none';
}

// document.addEventListener('keyup', event => {
document.addEventListener('keydown', event => {
    if(event.ctrlKey && event.key === 's') {
        event.preventDefault();
        // console.log('saving!');
        save();
    }
});

document.getElementById('save')
    .addEventListener('click', () => save());

document.getElementById('toggle-terminal')
    .addEventListener('click', () => toggleTerminal());

// fileName.focus();

updateFileTree('.');
setTimeout(() => {
    toggleTerminal();
}, 500);


