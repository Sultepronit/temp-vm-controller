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

function getParentPath(path) {
    const theIndex = path.lastIndexOf('/');
    return path.substring(0, theIndex);
}

function getName(path) {
    const theIndex = path.lastIndexOf('/') + 1;
    return path.substring(theIndex);
}

//sh commands
const actions = {
    async newItem(name) {
        const command = name.includes('/') ? 'mkdir' : 'touch';
        if(name.includes('/')) {

        }
        const postData = {
            action: 'manage-filesystem',
            command,
            name,
            path: selectedItem.path,
        }
        console.log(postData);

        await sendRequest(postData);

        if(command === 'mkdir') {
            refreshFileTree();
        } else { // touch
            refreshFileTree('file', `${selectedItem.path}/${name}`);
        }
    },
    async rename(newName) {
        const rootPath = getParentPath(selectedItem.path);
        const newPath = `${rootPath}/${newName}`;

        const postData = {
            action: 'manage-filesystem',
            command: 'mv',
            was: selectedItem.path,
            become: newPath
        }
        console.log(postData);
        await sendRequest(postData);

        if(selectedItem.type === 'file') {
            closeFile(selectedItem.path);
            setTimeout(() => {
                refreshFileTree('file', newPath);
            }, 500);
        } else { // dir
            toggleDirContent(selectedItem.path);
            refreshFileTree('dir', newPath);
        }
    }
};
let expectedAction = '';

const namesInput = document.getElementById('names-input');
// namesInput.classList.add('hide');
function activateInput() {
    namesInput.classList.remove('hide');
    namesInput.focus();
}

function deactivateInput() {
    namesInput.value = '';
    namesInput.classList.add('hide');
}
deactivateInput();

namesInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        actions[expectedAction](event.target.value);
        deactivateInput();
    } else if(event.key === 'Escape') {
        deactivateInput();
    }
});

function initNewItem() {
    activateInput();
    expectedAction = 'newItem';
}
document.getElementById('new-item')
    .addEventListener('click', () => initNewItem());

document.getElementById('rename').addEventListener('click', () => {
    activateInput();
    // namesInput.value = 'old name';
    namesInput.value = getName(selectedItem.path);
    expectedAction = 'rename';
});

async function rm() {
    if(!confirm(`Remove ${selectedItem.path} ?`)) renurn;
    const postData = {
        action: 'manage-filesystem',
        command: 'rm',
        item: selectedItem.path
    }
    console.log(postData);

    await sendRequest(postData);

    if(selectedItem.type === 'file') {
            const parent = getParentPath(selectedItem.path);
            // closeFile(selectedItem.path);
            // console.log(parent);
            setTimeout(() => {
                refreshFileTree('dir', parent);
            }, 1000);
        } else { // dir
            toggleDirContent(selectedItem.path);
            refreshFileTree('dir', getParentPath(selectedItem.path));
        }
}

document.getElementById('rm')
    .addEventListener('click', () => rm());



