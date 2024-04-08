const URL = 'http://localhost:3000/signup';
const form = document.querySelector('#signup-form');

let nameInput = document.querySelector('#name');
let surnameInput = document.querySelector('#surname');
let genderInput = document.querySelector('#gender');
let phoneInput = document.querySelector('#phone');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');
let contedorError = document.querySelector('#error-container');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = nameInput.value;
    const surname = surnameInput.value;
    const gender = genderInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    fetch(URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ name, surname, gender, phone,
            email, password })

    }).then(response => {
        if (!response.ok) {
            throw new Error('Incorrect server Response');
        }
       return response.json(), window.location.href = '/login.html';
    
    })

});
