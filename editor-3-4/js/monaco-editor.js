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
        fontSize: '20',
        // language: 'html'
    };
    monacoEditor = mnc.editor.create(document.getElementById('monaco'), params);
}
initMonaco();

// Register Vue language support
// mnc.languages.register({
//   id: 'vue',
//   extensions: ['.vue'],
//   aliases: ['Vue', 'vue'],
//   mimetypes: ['text/vue'],
// });

// // Define syntax highlighting rules for HTML inside Vue SFCs
// mnc.languages.setMonarchTokensProvider('vue', {
//   tokenizer: {
//     root: [
//       // HTML tags
//       [/\<\s*template\s*/, { token: 'delimiter.html' }],
//       [/\<\s*script\s*/, { token: 'delimiter.html' }],
//       [/\<\s*style\s*/, { token: 'delimiter.html' }],
//       // Vue directives
//       [/@[^\s"'`=]+/, 'attribute.value'],
//       // HTML comments
//       [/<!--/, 'comment.html', '@comment'],
//     ],
//     comment: [
//       [/-->/, 'comment.html', '@pop'],
//       [/--/, 'comment.html'],
//     ],
//   },
// });

function createModel(filePath, fileContent) {
    const url = fileRoot + filePath.substring(1);
    console.log(url);

    const model = mnc.editor.createModel(fileContent, null, monaco.Uri.parse(url));
    // const model = mnc.editor.createModel(fileContent, 'html', monaco.Uri.parse(url));
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