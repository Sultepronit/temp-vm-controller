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

function selectItem(type, path) {
    if(type === 'dir') {
        toggleDirContent(path);
    }

    if(selectedItem.path === path) {
        return;
    }

    if(type === 'file') {
        selectFile(path);
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

function updateDirCont(baseDir) {
   // const baseDir = '.';
    const postData = {
        action: 'getFileTree',
        baseDir
    }
    console.log(postData);

    sendRequest(postData).then((response) => {
        const treeObject = JSON.parse(response);
        // console.log(treeObject);
 
        let dirCont = '<div class="dir-cont">';
        for(const dir of treeObject.directories) {
            const fullPath = `${baseDir}/${dir}`;
            const id = pathToId(fullPath);
            const tag = `
                <div id="${id}" class="dir">
                    <p class="dir-name filename" onclick="selectItem('dir','${fullPath}')">
                        <abbr title=${fullPath}>${dir}</abbr>
                    </p>
                </div>
            `;
            dirCont += tag;
        }

        for(const file of treeObject.files) {
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
    }); 
}