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

// function removeExpandedDir() {

// }

function refreshFileTree(type, path) {
    if(!type) { // reselect 
        type = 'dir';
        path = selectedItem.path;
        selectedItem.path = '';
        const theIndex = treeObject.expandedDirs.indexOf(path);
        delete treeObject.expandedDirs[theIndex];
    }

    for(const dir of treeObject.expandedDirs) {
        if(dir) {
            selectDir(dir);
        }
    }

    setTimeout(() => {
        selectItem(type, path);
    }, 200);
}

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

//sh commands
const actions = {
    async newItem(name) {
        const command = name.includes('/') ? 'mkdir' : 'touch';
        if(name.includes('/')) {

        }
        const postData = {
            action: 'manage-filesystem',
            name,
            path: selectedItem.path,
            command
        }
        console.log(postData);

        await sendRequest(postData);

        if(command === 'mkdir') {
            refreshFileTree();
        } else { // touch
            refreshFileTree('file', `${selectedItem.path}/${name}`);
        }
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

function getParentPath(path) {
    const theIndex = path.lastIndexOf('/');
    console.log(path.substring(0, theIndex));
    return path.substring(0, theIndex);
}

async function rm() {
    if(!confirm(`Remove ${selectedItem.path} ?`)) renurn;
    const postData = {
        action: 'manage-filesystem',
        item: selectedItem.path,
        command: 'rm'
    }
    console.log(postData);

    await sendRequest(postData);

    if(selectedItem.type === 'dir') {
        toggleDirContent(selectedItem.path);
    }

    refreshFileTree('dir', getParentPath(selectedItem.path));
}

document.getElementById('rm')
    .addEventListener('click', () => rm());



