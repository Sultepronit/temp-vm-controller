
import { reactive } from 'vue';

import sendRequest from './api.js';

const root = reactive({
    main: {
        name: 'root', path: '.'
    },
    temp: null,
});

const branches = reactive([]);

async function getDirCont(dirPath) {
    const postData = {
        action: 'getFileTree',
        baseDir: dirPath
    }
    console.log(postData);

    const resp = await sendRequest(postData);
    const result = JSON.parse(resp);
 
    return result;
}

const dirs = reactive([{
    ...root.main, // name, path
    cont: null
}]);
console.log(dirs);

async function addDirCont(index) {
    const cont = await getDirCont(dirs[index].path);
    const branchIndexes = [];
    for(const dirName of cont.directories) {
        console.log(dirName);
        const newDir = {
            name: dirName,
            path: `${dirs[index].path}/${dirName}`,
            cont: null
        }
        dirs.push(newDir);
        branchIndexes.push(Object.values(dirs).length - 1)
    }

    return branchIndexes;
}

console.log(await addDirCont(0));

async function setDirCont(branch) {
    const contents = await getDirCont(branch.path);
    branch.dirs = contents.directories;
}

async function addBranch(name, path) {
    const branch = {
        name,
        path,
        // contents: await getDirCont(path) 
    }
    // console.log(branch);
    
    await setDirCont(branch);

    branches.push(branch);

    // console.log(Object.values(branches).length);
    console.log(branches);
    return Object.values(branches).length - 1;
}

// setInterval(async () => {
//     console.log('reload!');
//     for(const branch of branches) {
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

export { root, dirs, branches, addBranch };