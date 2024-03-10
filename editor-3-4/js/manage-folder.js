"use strict";
const folder = document.getElementById('folder');


function selectDir(path) {
    console.log(path);
}

function folderContUpdate(baseDir, dirContObject) {
    console.log('Here we go!');
    let dirCont = '';
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
    
    folder.innerHTML = dirCont;
}