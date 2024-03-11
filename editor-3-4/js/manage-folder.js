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