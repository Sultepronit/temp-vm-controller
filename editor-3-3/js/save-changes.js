"use strict";
console.log('saving!');

const editorElement = document.querySelector('.editor');

function highlightChanges(areUnsaved) {
    currentFile.changed = areUnsaved;
    const currentTab = document.getElementById('tab-' + pathToId(currentFile.path));

    if(areUnsaved) {
        // editorElement.style.borderColor = 'red';
        editorElement.classList.add('unsaved');
        // currentTab.style.background = 'pink';
        currentTab.classList.add('unsaved-tab');
    } else {
        // editorElement.style.borderColor = 'white';
        editorElement.classList.remove('unsaved');
        currentTab?.classList.remove('unsaved-tab');
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
