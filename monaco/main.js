// import manageFile from "./manageFile.js";
"use strict";

const simpleEditor = document.getElementById('simple-editor');
const previousCommands = document.getElementById('previous-commands');
const fileName = document.getElementById('the-input');

function addResponse(response) {
    // simpleEditor.innerText = response;
    // simpleEditor.value = response;
    editInMonaco(fileName.value, response);
}

function addCommand(file) {
    const postData = {
        file,
        action: 'getFile',
    }
    // manageFile(command).then((response) => {
    manageFile(postData).then((response) => {
        // console.log(response);
        addResponse(response);
    });
}

fileName.addEventListener('keyup', (event) => {
    if(event.key === 'Enter' && !event.shiftKey) {
        const command = fileName.value;
        // addCommand(theInput.value);
        addCommand(command);
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

    manageFile(postData).then((response) => {
        // console.log(response);
        // addResponse(response);
    });
}

document.getElementById('save')
    .addEventListener('click', () => save());

fileName.focus();