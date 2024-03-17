import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

let monacoEditor = null;
function createEditor(editorElement) {

    const params = {
        wordWrap: 'on',
        theme: 'vs-dark',
        // theme: 'hc-black',
        fontSize: '20',
        // language: 'html',
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
		language: 'javascript'
    };
    monacoEditor = monaco.editor.create(editorElement.value, params);
}

function editFile(fileContent, url) {
    const model = monaco.editor.createModel(fileContent, null, monaco.Uri.parse(url));
    monacoEditor.setModel(model);
    console.log(model);
}


export { monacoEditor, createEditor, editFile };