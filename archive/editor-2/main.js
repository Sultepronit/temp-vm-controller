// import manageFile from "./manageFile.js";
"use strict";

const simpleEditor = document.getElementById('simple-editor');
// const previousCommands = document.getElementById('previous-commands');
const fileName = document.getElementById('the-input');
const unsaved = document.getElementById('unsaved');

let currentModel = null;

function editFile(name, contents) {
    // simpleEditor.innerText = response;
    // simpleEditor.value = response;
    currentModel = editInMonaco(name, contents);
    fileName.value = name;
    console.log(currentModel);
}

const unsavedChanges = {
    add() {
        unsaved.style.backgroundColor = 'red';
    },
    remove() {
        console.log('saved1111');
        unsaved.style.backgroundColor = '';
    }
}

setInterval(() => {
    // console.log(currentModel.isDirty());
    // console.log(currentModel.isDirty);
    currentModel?.onDidChangeContent((event) => {
        // console.log(event);
        console.log('changes!');
        // unsaved.innerText = '#';
        unsavedChanges.add();
    });
}, 1000);

function selectFile(fileName) {
    const postData = {
        file: fileName,
        action: 'getFile',
    }
    console.log(postData);
    // manageFile(command).then((response) => {
    manageFile(postData).then((response) => {
        // console.log(response);
        editFile(fileName, response);
    });
}

fileName.addEventListener('keyup', (event) => {
    if(event.key === 'Enter' && !event.shiftKey) {
        const command = fileName.value;
        // addCommand(theInput.value);
        selectFile(command);
        // theInput.value = '';
    }
});

const windowHeight = window.innerHeight;

function save() {
    console.log('saving');
    // console.log(simpleEditor.value);
    const postData = {
        file: fileName.value,
        action: 'saveFile',
        // contents: simpleEditor.value
        contents: monacoEditor.getValue()
    }
    console.log(postData);

    manageFile(postData).then((response) => {
        unsavedChanges.remove();
    });
}

// document.addEventListener('keyup', event => {
document.addEventListener('keydown', event => {
    if(event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('saving!');
        save();
    }
});

document.getElementById('save')
    .addEventListener('click', () => save());

fileName.focus();

// const filetree = document.getElementById('filetree');
// filetree.innerHTML += `<p>ggggg</p>`;
// console.log(filetree);
function updateFileTree(baseDir) {
   // const baseDir = '.';
    const postData = {
        action: 'getFileTree',
        baseDir
    }
    console.log(postData);

    let treeObject = null;
    manageFile(postData).then((response) => {
        treeObject = JSON.parse(response);
        console.log(treeObject);
        // addResponse(response);
        // const theDir = document.getElementById(baseDir);
        // theDir.innerHTML = '<div class="dir-cont"></div>';
        // let dirCont = '<div class="dir-cont">';
        let dirCont = '';
        for(const dir of treeObject.directories) {
            console.log(dir);
            const fullPath = `${baseDir}/${dir}`;
            // const id = (`${baseDir}/${dir}`).substring(1);
            const id = (`${baseDir}/${dir}`)
                // .replace('./', 'root/')
                .replaceAll('.', '-dot-')
                .replaceAll('/', '-S-');
            const tag = `
                <div class="dir" id="${id}">
                    <p class="dir-name" onclick="updateFileTree('${fullPath}')">${dir}</p>
                    <div class="dir-cont"></div>
                </div>
            `;
            // filetree.innerHTML += `<p>${dir}</p>`;
            // filetree.innerHTML += tag;
            // theDir.innerHTML += tag;
            dirCont += tag;
        }
        for(const file of treeObject.files) {
            // console.log(file);
            const fullPath = `${baseDir}/${file}`;
            dirCont += `<p onclick="selectFile('${fullPath}')">${file}</p>`;
        }
        // dirCont += '</div>';
        // document.getElementById(baseDir).innerHTML += dirCont;
        // let id = baseDir.substring(1);
        // let id = baseDir.replace('./', 'root/').replaceAll('/', '--');;
        let id = baseDir.replaceAll('.', '-dot-').replaceAll('/', '-S-');
        // if(baseDir === '.') {
        //     baseDir = 'root-dir';
        // }
        if(id === '-dot-') {
            id = 'root-dir';
        }
        console.log(`#${id} .dir-cont`);
        document.querySelector(`#${id} .dir-cont`).innerHTML = dirCont;
        document.getElementById(id).style.borderWidth = '1px';
        // document.querySelector(`#rrr .dir-cont`).innerHTML = dirCont;
        // document.querySelector(`#root-dir .dir-cont`).innerHTML = dirCont;
        // const newCont = `
        //     <p class="dir-name" onclick="updateFileTree('${baseDir}')">${dir}</p>
        //     <div class="dir-cont">${dirCont}</div>
        // `;
        // document.getElementById(id).innerHTML = dirCont;
    }); 
}

updateFileTree('.');
