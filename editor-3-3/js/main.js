"use strict";

console.log(window.location);
const myHref = window.location.href;
console.log(myHref);

const lastSlash = myHref.substring(0, myHref.length - 1).lastIndexOf("/");
const fileRoot = myHref.substring(0, lastSlash);
console.log(fileRoot);

function toggleTerminal() {
    const terminal = document.querySelector('.terminal');
    terminal.style.display = terminal.style.display == 'none' ? 'block' : 'none';
}

document.getElementById('toggle-terminal')
    .addEventListener('click', () => toggleTerminal());

selectItem('dir', '.');
setTimeout(() => {
    toggleTerminal();
}, 500);


