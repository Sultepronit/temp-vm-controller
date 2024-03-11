"use strict";
const folder = document.getElementById('folder');
const folderCont = document.getElementById('folder-cont');

function folderContUpdate(baseDir, dirContObject) {
    // console.log('Here we go!');
    let dirCont = '';
    for(const dirName of dirContObject.directories) {
        const path = `${baseDir}/${dirName}`;
        dirCont += `
            <p class="dir-name filename" onclick="selectItem('dir','${path}')">
                <abbr title=${path}>${dirName}</abbr>
            </p>
        `;
    }

    for(const file of dirContObject.files) {
        const path = `${baseDir}/${file}`;
        dirCont += `
            <p class="filename" onclick="selectItem('file', '${path}')">
                <abbr title=${path}>${file}</abbr>
            </p>
        `;
    }
    dirCont += '</div>';
    
    folderCont.innerHTML = dirCont;
}

function refreshFileTree() {
    // console.log(treeObject.expandedDirs);
    for(const dir of treeObject.expandedDirs) {
        selectDir(dir);
    }
}

//dir actions
const actions = {
    async newItem(name) {
        const postData = {
            action: 'manage-filesystem',
            name,
            path: selectedItem.path,
            command: name.includes('/') ? 'mkdir' : 'touch'
        }
        console.log(postData);

        await sendRequest(postData);

        refreshFileTree();
    }
};
let expectedAction = '';

const namesInput = document.getElementById('names-input');

namesInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        // console.log(event.target.value);
        actions[expectedAction](event.target.value);
        event.target.value = '';
        namesInput.disabled = true;
    }
});

function initNewItem() {
    namesInput.disabled = false;
    namesInput.focus();
    expectedAction = 'newItem';
}
document.getElementById('new-item')
    .addEventListener('click', () => initNewItem());

async function rm() {
    if(!confirm(`Remove ${selectedItem.path} ?`)) renurn;
    const postData = {
        action: 'manage-filesystem',
        // name,
        item: selectedItem.path,
        command: 'rm'
    }
    console.log(postData);

    // sendRequest(postData).then((response) => {
    //     // highlightChanges(false);
    // });
    await sendRequest(postData);

    refreshFileTree();
}

document.getElementById('rm')
    .addEventListener('click', () => rm());

function changeRoot() {
    treeObject.expandedDirs = [];

    if(selectedItem.path === treeObject.projectRoot?.path) {
        treeObject.projectRoot = null;
        newTree(treeObject.root);
    } else {
        treeObject.projectRoot = {
            path: selectedItem.path, dirName: selectedItem.path
        }
        newTree(treeObject.projectRoot);
    }

    console.log(treeObject);
}

document.getElementById('change-root')
    .addEventListener('click', () => changeRoot());

