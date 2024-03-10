"use strict";
// const unsaved = document.getElementById('unsaved');
const editorElement = document.querySelector('.editor');

let currentModel = null;

function editFile(name, contents) {
    currentModel = editInMonaco(name, contents);
}

const unsavedChanges = {
    add() {
        // unsaved.style.backgroundColor = 'red';
        editorElement.style.borderColor = 'red';
    },
    remove() {
        // unsaved.style.backgroundColor = '';
        editorElement.style.borderColor = 'white';
    }
}

setInterval(() => {
    currentModel?.onDidChangeContent((event) => {
        // console.log('changes!');
        unsavedChanges.add();
    });
}, 1000);

function selectFile(fileName) {
    const postData = {
        file: fileName,
        action: 'getFile',
    }
    sendRequest(postData).then((response) => {
        editFile(fileName, response);
    });
}

const windowHeight = window.innerHeight;

function save() {
    console.log('saving');
    // console.log(simpleEditor.value);
    const postData = {
        file: selectedItem.path,
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

// updateFileTree('.');
selectItem('dir', '.');
setTimeout(() => {
    toggleTerminal();
}, 500);


