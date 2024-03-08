"use strict";
console.log('saving!');

const editorElement = document.querySelector('.editor');

function highlightChanges(areUnsaved) {
    currentFile.changed = areUnsaved;
    if(areUnsaved) {
        editorElement.style.borderColor = 'red';
    } else {
        editorElement.style.borderColor = 'white';
    }
}

function save() {
    console.log('saving');
    
    const postData = {
        file: selectedItem.path,
        action: 'saveFile',
        contents: monacoEditor.getValue()
    }
    console.log(postData);

    sendRequest(postData).then((response) => {
        highlightChanges(false);
    });
}

document.addEventListener('keydown', event => {
    if(event.ctrlKey && event.key === 's') {
        event.preventDefault();
        save();
    }
});

document.getElementById('save')
    .addEventListener('click', () => save());
