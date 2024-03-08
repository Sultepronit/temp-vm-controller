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

async function openFile(filePath) {
    const fileContent = await fetchFileContent(filePath);
    
    currentFile = {
        name: getFileName(filePath),
        path: filePath,
        model: createModel(filePath, fileContent),
        changed: false,
        setChanged(newVal) {
            this.changed = newVal;
        },
    }
    openedFiles.push(currentFile);
}

async function selectFile(filePath) {
    if(currentFile) {
        saveViewState(currentFile);
    }

    currentFile = openedFiles.find(({path}) => filePath === path);

    if(!currentFile) {
        await openFile(filePath);
    }
    
    editInMonaco(currentFile);
    highlightChanges(currentFile.changed);

    // console.log(currentFile);
    console.log(openedFiles);
}
