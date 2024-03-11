"use stric";

const openedFiles = [];
let currentFile = null;

async function fetchFileContent(filePath) {
    const postData = {
        file: filePath,
        action: 'getFile',
    }
    
    return await sendRequest(postData);
}

function getFileName(filePath) {
    return filePath.substring(filePath.lastIndexOf('/') + 1);
}

function findPairs(theFile, files) {
    const namesake = files.find(file => file.name === theFile.name);
    if(namesake === theFile) return;

    const theFilePath = theFile.path.split('/');
    const namesakePath = namesake.path.split('/');

    for(let i = 0; i < theFilePath.length; i++) {
        if(theFilePath[i] !== namesakePath[i]) {
            theFile.prefix = theFilePath[i];
            namesake.prefix = namesakePath[i];
            break;
        }
    }
}

function findNamesakes(files) {
    for(const file of files) {
        file.prefix = '';
        console.log(file);
        findPairs(file, files);
    }
}

const tabsElement = document.getElementById('tabs');
function renderTabs() {
    findNamesakes(openedFiles);

    tabsElement.innerHTML = '';
    
    let index = 0;
    for(const file of openedFiles) {
        const addClass = file.changed ? 'unsaved-tab' : '';
        tabsElement.innerHTML += `
            <span
                id="tab-${pathToId(file.path)}"
                class="file-tab ${addClass}"
            >
                <abbr
                    title="${file.path}"
                    onclick="selectItem('file', '${file.path}')"
                >
                    <span class="name-prefix">${file?.prefix || ''}</span> ${file.name}
                </abbr>

                <span class="close-file" onclick="closeFile(${index})">✖</span>
            </span>
        `;
        index++
    }
}

async function openFile(filePath) {
    const fileContent = await fetchFileContent(filePath);
    
    currentFile = {
        name: getFileName(filePath),
        path: filePath,
        model: createModel(filePath, fileContent),
        changed: false,
        // setChanged(newVal) {
        //     this.changed = newVal;
        // },
    }
    openedFiles.unshift(currentFile);
}

async function selectFile(filePath) {
    if(currentFile) {
        saveViewState(currentFile);
    }

    currentFile = openedFiles.find(({path}) => filePath === path);

    if(!currentFile) {
        await openFile(filePath);
    } else {
        const lastPosition = openedFiles.indexOf(currentFile);
        openedFiles.splice(lastPosition, 1);
        openedFiles.unshift(currentFile);
    }
    
    editInMonaco(currentFile);
    highlightChanges(currentFile.changed);

    // console.log(openedFiles);
    renderTabs();
}


function closeFile(index) {
    // console.log(index);
    // console.log(openedFiles[index]);
    openedFiles[index].model.dispose();
    openedFiles.splice(index, 1);
    
    if(index === 0 && openedFiles.length > 0) {
        selectItem('file', openedFiles[0].path);
    } else {
        renderTabs();
    }
}