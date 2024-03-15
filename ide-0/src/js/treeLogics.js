
import { ref, reactive } from 'vue';

import sendRequest from './api.js';

const treeObject = reactive({
    root: {
        name: 'root', path: '.'
    },
    projectRoot: null,
    branches: [],
    branchesLength: 0
});

async function getDirCont(dirName) {
    const postData = {
        action: 'getFileTree',
        baseDir: dirName
    }
    // console.log(postData);

    const resp = await sendRequest(postData);
    const dirContObject = JSON.parse(resp);
 
    // console.log(dirContObject);
    return dirContObject;
}

// getDirCont(treeObject.root.path);

async function addBranch(name, path) {
    treeObject.branchesLength++;
    const branch = {
        name,
        path,
        contents: await getDirCont(path) 
    }
    // console.log(branch);
    treeObject.branches.push(branch);

    console.log(Object.values(treeObject.branches).length);
    // return branch;
    // return treeObject.branches[treeObject.branchesLength - 1];
    return Object.values(treeObject.branches).length - 1;
}

setInterval(async () => {
    console.log('reload!');
    for(const branch of treeObject.branches) {
        branch.contents = await getDirCont(branch.path);
    }
}, 10000);

// setTimeout(() => {
//     // console.log(treeObject.branches[1]);
//     console.log(treeObject.branches);
//     console.log(treeObject.branches[0].contents);
//     console.log(treeObject.branches[0].contents.directories);
//     console.log(treeObject.branches[0].contents.directories[3]);
//     treeObject.branches[0].contents.directories[3] = 'dirrrr';
// }, 6000);

export { treeObject, addBranch };