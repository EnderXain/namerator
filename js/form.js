const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    const item = document.querySelector('#fileToUpload').value;
}