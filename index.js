const dropZone = document.querySelector('#DnDContainer');
const fileButton = document.querySelector('button');

const imageExtensions = ['png', 'jpeg', 'jpg'];

const fileInput = createFileInput();
fileButton.appendChild(fileInput);

function createFileInput() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.opacity = '0';
    fileInput.style.position = 'absolute';
    fileInput.style.inset = '0';

    return fileInput;
}

fileInput.onchange = function(e) {
    loadFile(e.target.files[0])
    e.target.value = '';
};

window.ondragover = preventDefault;
window.ondragenter = preventDefault;
window.ondragleave = preventDefault;

function preventDefault(e) {
    e.preventDefault();
}
window.ondrop = preventDefault;
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    loadFile(e.dataTransfer.files[0]);
});

function loadFile(file) {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend = (e) => {
        if ( hasImageExtension(file.type) ) return setDropZoneBackground(e.target.result);
        setFileDescription(file);
    }
};

function hasImageExtension(type) {
    const extension = getFileExtension(type);
    return !!imageExtensions.find(item => item === extension);
}

function setFileDescription(file) {
    removeLastActions();
    const span = document.createElement('span');
    span.style.display = 'block';
    span.className = 'fileDescription';
    span.style.textAlign = 'center';
    span.innerHTML = getFileData(file);
    dropZone.appendChild(span);
}

function getFileData(file) {
    return `${file.name} <br> ${file.size}`
}

function setDropZoneBackground(src) {
    removeLastActions();
    dropZone.style.background = `no-repeat url(${src})`;
    dropZone.style.backgroundPosition = 'center';
    dropZone.style.backgroundSize = 'cover';
}

function removeLastActions() {
    dropZone.style.background = 'none';
    if ( !dropZoneHaveFileDescription() ) return;
    deleteFileDescription();
}

function getFileExtension(type) {
    return type.split('/').reverse()[0];
}

function dropZoneHaveFileDescription() {
    const lastChild = dropZone.children[dropZone.children.length - 1];
    return lastChild.className === 'fileDescription';
}

function deleteFileDescription() {
    dropZone.removeChild(
        dropZone.lastChild
    );
}
