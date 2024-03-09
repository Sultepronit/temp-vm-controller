require.config({ paths: { vs: 'node_modules/monaco-editor/min/vs' } });

function getMonaco() {
    return new Promise((resolve, reject) => {
        require(['vs/editor/editor.main'], () => {
            resolve(monaco);
        });
    });
}


let mnc = null;
let monacoEditor = null;

async function initMonaco() {
    mnc = await getMonaco();
    const params = {
        wordWrap: 'on',
        theme: 'vs-dark',
        // theme: 'hc-black',
        fontSize: '20'
    };
    monacoEditor = mnc.editor.create(document.getElementById('monaco'), params);
}
initMonaco();

function createModel(filePath, fileContent) {
    const url = fileRoot + filePath.substring(1);
    console.log(url);

    const model = mnc.editor.createModel(fileContent, null, monaco.Uri.parse(url));
    model.onDidChangeContent((event) => {
        highlightChanges(true);
    });

    return model;
}

function editInMonaco(currentFile) {
    monacoEditor.setModel(currentFile.model);
    if(currentFile.viewState) {
        monacoEditor.restoreViewState(currentFile.viewState);
    }
}

function saveViewState(currentFile) {
    currentFile.viewState = monacoEditor.saveViewState();
}