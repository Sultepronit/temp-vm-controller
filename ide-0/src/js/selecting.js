import sendRequest from "./api.js";
// import { editFile } from "./monacoLogics.js";
import { editFile } from "./iframeLogics.js";

async function fetchFileContent(filePath) {
    const postData = {
        file: filePath,
        action: 'getFile',
    }
    
    return await sendRequest(postData);
}

async function selectItem(type, parent, name, path) {
    console.log(`selected ${type} ${path}!`);
    if(type === 'file') {
        // fetchFileContent(path);
        // editFile(await fetchFileContent(path), path);
        editFile(path);
    } 
}

export { selectItem };