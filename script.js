function saveFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const files = JSON.parse(localStorage.getItem('virtualFiles')) || [];
            files.push({ name: file.name, data: event.target.result });
            localStorage.setItem('virtualFiles', JSON.stringify(files));
            displayFiles();
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to save.');
    }
}

function displayFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    const files = JSON.parse(localStorage.getItem('virtualFiles')) || [];
    files.forEach(file => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `<strong>${file.name}</strong> <a href="${file.data}" download="${file.name}">Download</a>`;
        fileList.appendChild(li);
    });
}

window.onload = displayFiles;