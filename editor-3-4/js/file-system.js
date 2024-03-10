"use strict";
const workingPath = document.getElementById('working-path');

function pathToId(path) {
    let id = path
        .replaceAll('.', '-dot-')
        .replaceAll('/', '-S-');

    if(id === '-dot-') {
        id = 'root-dir';
    }

    return id;
}

const selectedDecoration = {
    selectElement({type, path}) {
        if(!path) {
            return null;
        }
        // console.log(type, path);
        const id = pathToId(path);
        return type === 'file' ? document.getElementById(id)
            : document.querySelector(`#${id} .dir-name`);
    },
    add(item) {
        const theElement = this.selectElement(item);
        if(!theElement) return;

        theElement.style.textDecoration = 'underline';
    },
    remove(item) {
        const theElement = this.selectElement(item);
        if(!theElement) return;

        theElement.style.textDecoration = 'none';
    }
}

const selectedItem = {
    type: '',
    path: ''
};

const monacoElement = document.getElementById('monaco');

function selectItem(type, path) {
    if(type === 'dir') {
        toggleDirContent(path);
    }
    // console.log(1);
    if(selectedItem.path === path) {
        return;
    }
    // console.log(2);
    if(type === 'file') {
        selectFile(path);
        // monacoElement.classList.remove('hide');
        folder.classList.add('hide');
    } else { // dir
        // selectDir(path);
        folder.classList.remove('hide');
        // monacoElement.classList.add('hide');
    }

    workingPath.innerText = path;

    selectedDecoration.remove(selectedItem);

    selectedItem.type = type;
    selectedItem.path = path;
    
    selectedDecoration.add(selectedItem);
}

const expandedDirStyle = {
    selectElement(id) {
        return {
            baseDirElement: document.getElementById(id),
            dirNameElement: document.querySelector(`#${id} .dir-name`)
        }
    },
    add(id) {
        const { baseDirElement, dirNameElement } = this.selectElement(id);
        baseDirElement.style.margin = '0.1em 0 0.2em';

        dirNameElement.style.color = 'black';
        dirNameElement.style.fontWeight = 'bold';
        dirNameElement.style.background = '#00ff66';
    },
    remove(id) {
        const { baseDirElement, dirNameElement } = this.selectElement(id);
        baseDirElement.style.margin = '0';

        dirNameElement.style.color = '#00ff66';
        dirNameElement.style.fontWeight = '';
        dirNameElement.style.background = '';
    }
}

const expandedDirs = [];
function toggleDirContent(path) {
    const theIndex = expandedDirs.indexOf(path);
    // if(expandedDirs.includes(path)) {
    if(theIndex >= 0) {
        const id = pathToId(path);
        document.querySelector(`#${id} .dir-cont`).outerHTML = '';
        expandedDirStyle.remove(id);

        delete expandedDirs[theIndex];
    } else {
        updateDirCont(path);
        expandedDirs.push(path);
    }
}

function createDirTag(path, dirName) {
    const id = pathToId(path);
    const tag = `
        <div id="${id}" class="dir">
            <p class="dir-name filename" onclick="selectItem('dir','${path}')">
                <abbr title=${path}>${dirName}</abbr>
            </p>
        </div>
    `;
    return tag;
}

function createRoot(path, dirName) {
    const filetree = document.getElementById('filetree');
    filetree.innerHTML = createDirTag(path, dirName);
    selectItem('dir', path);
}

function treeDirContUpdate(baseDir, dirContObject) {
    let dirCont = '<div class="dir-cont">';
    for(const dir of dirContObject.directories) {
        const fullPath = `${baseDir}/${dir}`;
        dirCont += createDirTag(fullPath, dir);
    }

    for(const file of dirContObject.files) {
        const fullPath = `${baseDir}/${file}`;
        const id = pathToId(fullPath);
        dirCont += `
            <p id="${id}" class="filename" onclick="selectItem('file', '${fullPath}')">
                <abbr title=${fullPath}>${file}</abbr>
            </p>
        `;
    }
    dirCont += '</div>';

    let id = pathToId(baseDir);
    
    const baseDirElement = document.getElementById(id);
    baseDirElement.innerHTML += dirCont;
    expandedDirStyle.add(id);
}

async function updateDirCont(dirName) {
    const postData = {
        action: 'getFileTree',
        baseDir: dirName
    }
    console.log(postData);

    const resp = await sendRequest(postData);
    const dirContObject = JSON.parse(resp);
 
    treeDirContUpdate(dirName, dirContObject);
    folderContUpdate(dirName, dirContObject);
}