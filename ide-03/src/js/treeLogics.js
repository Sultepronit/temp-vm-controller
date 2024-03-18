
import { reactive } from 'vue';

import sendRequest from './api.js';

const root = reactive({
    main: {
        name: 'root', path: '.'
    },
    temp: null,
});

const branches = reactive([]);

async function getDirCont(dirName) {
    const postData = {
        action: 'getFileTree',
        baseDir: dirName
    }
    console.log(postData);

    const resp = await sendRequest(postData);
    const result = JSON.parse(resp);
 
    return result;
}

async function setDirCont(branch) {
    const contents = await getDirCont(branch.path);
    branch.dirs = contents.directories;
    branch.files = contents.files;
}

async function addBranch(name, path) {
    const branch = {
        name,
        path,
    }
    // console.log(branch);
    
    await setDirCont(branch);

    branches.push(branch);

    console.log(branches);
    return Object.values(branches).length - 1;
}

// setInterval(async () => {
//     console.log('reload!');
//     for(const branch of branches) {
//         if(!branch) continue;
//         // branch.contents = await getDirCont(branch.path);
//         await setDirCont(branch);
//     }
// }, 10000);

// setTimeout(() => {
//     // console.log(treeObject.branches[1]);
//     console.log(treeObject.branches);
//     console.log(treeObject.branches[0].contents);
//     console.log(treeObject.branches[0].contents.directories);
//     console.log(treeObject.branches[0].contents.directories[3]);
//     treeObject.branches[0].contents.directories[3] = 'dirrrr';
// }, 6000);

export { root, branches, addBranch };