"use strict";

function pathToId(path) {
    let id = path
        .replaceAll('.', '-dot-')
        .replaceAll('/', '-S-');

    if(id === '-dot-') {
        id = 'root-dir';
    }

    return id;
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
        updateFileTree(path);
        expandedDirs.push(path);
    }
}

function updateFileTree(baseDir) {
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
                <div class="dir" id="${id}">
                    <p class="dir-name" onclick="toggleDirContent('${fullPath}')">
                        <abbr title=${fullPath}>${dir}</abbr>
                    </p>
                </div>
            `;
            dirCont += tag;
        }

        for(const file of treeObject.files) {
            const fullPath = `${baseDir}/${file}`;
            dirCont += `
                <p onclick="selectFile('${fullPath}')">
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