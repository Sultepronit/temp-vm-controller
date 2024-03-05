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

const expandedDirs = [];
function toggleDirContent(path) {
    console.log('Go!');
    if(expandedDirs.includes(path)) {
        console.log('Time to hide!');

        const id = pathToId(path);
        document.querySelector(`#${id} .dir-cont`).innerHTML = '';
        document.getElementById(id).style.borderWidth = '0';

        delete expandedDirs[path];
        console.log(expandedDirs);
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

        // theDir.innerHTML = '<div class="dir-cont"></div>';
        // let dirCont = '<div class="dir-cont">';
        let dirCont = '';
        for(const dir of treeObject.directories) {
            const fullPath = `${baseDir}/${dir}`;
            const id = pathToId(fullPath);
            const tag = `
                <div class="dir" id="${id}">
                    <p class="dir-name" onclick="toggleDirContent('${fullPath}')">${dir}</p>
                    <div class="dir-cont"></div>
                </div>
            `;
            dirCont += tag;
        }

        for(const file of treeObject.files) {
            const fullPath = `${baseDir}/${file}`;
            dirCont += `<p onclick="selectFile('${fullPath}')">${file}</p>`;
        }

        let id = pathToId(baseDir);
        
        document.querySelector(`#${id} .dir-cont`).innerHTML = dirCont;
        document.getElementById(id).style.borderWidth = '1px';
    }); 
}