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
    selectElement(path) {
        if(!path) return;
        return document.querySelector(`#${pathToId(path)} .the-name`);
    },
    add(path) {
        const theItem = this.selectElement(path);
        if(!theItem) return;
        theItem.classList.add('selected-item');
    },
    remove(path) {
        const theItem = this.selectElement(path);
        if(!theItem) return;
        theItem.classList.remove('selected-item');
    }
}

// const monacoElement = document.getElementById('monaco');

const selectedItem = {
    type: '',
    path: ''
};
function selectItem(type, path) {
    if(type === 'dir') {
        // toggleDirContent(path);
        selectDir(path);
    }

    if(selectedItem.path === path) {
        return;
    }

    if(type === 'file') {
        selectFile(path);
        folder.classList.add('hide');
    } else { // dir
        // selectDir(path);
        folder.classList.remove('hide');
    }

    workingPath.innerText = path;

    selectedDecoration.add(path);
    selectedDecoration.remove(selectedItem.path);

    // selectedItem.type = type;
    selectedItem.path = path;
}

const expandedDirStyle = {
    selectElement(id) {
        return {
            baseDirElement: document.getElementById(id),
            dirNameElement: document.querySelector(`#${id} .dir-name`),
            toggleCont: document.querySelector(`#${id} .toggle-cont`)
        }
    },
    add(id) {
        const { baseDirElement, dirNameElement, toggleCont } = this.selectElement(id);
        baseDirElement.style.margin = '0.1em 0 0.2em';

        dirNameElement.style.color = 'black';
        dirNameElement.style.fontWeight = 'bold';
        dirNameElement.style.background = '#00ff66';

        toggleCont.innerText = '-';
    },
    remove(id) {
        const { baseDirElement, dirNameElement, toggleCont } = this.selectElement(id);
        baseDirElement.style.margin = '0';

        dirNameElement.style.color = '#00ff66';
        dirNameElement.style.fontWeight = '';
        dirNameElement.style.background = '';

        toggleCont.innerText = '+';
    }
}

const expandedDirs = [];

function selectDir(path) {
    console.log('selectDir()');
    const theIndex = expandedDirs.indexOf(path);
    if(theIndex >= 0) {
        const id = pathToId(path);
        document.querySelector(`#${id} .dir-cont`).outerHTML = '';
    } else {
        expandedDirs.push(path);
    }
    updateDirCont(path);
}

function toggleDirContent(path) {
    const theIndex = expandedDirs.indexOf(path);
    if(theIndex >= 0) {
        const id = pathToId(path);
        document.querySelector(`#${id} .dir-cont`).outerHTML = '';
        expandedDirStyle.remove(id);

        delete expandedDirs[theIndex];
    } else {
        selectItem('dir', path);
    }
}

function createDirTag(path, dirName) {
    const id = pathToId(path);
    const tag = `
        <div id="${id}" class="dir">
            <p class="dir-name filename">
                <span class="toggle-cont" onclick="toggleDirContent('${path}')">+</span>
                <abbr 
                    title=${path}
                    class="the-name"
                    onclick="selectItem('dir','${path}')"
                >
                    ${dirName}
                </abbr>
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
                <abbr title=${fullPath} class="the-name">${file}</abbr>
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