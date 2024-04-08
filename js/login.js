const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const contedorError = document.querySelector('#error-container');


form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            //'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ email, password })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Incorrect Server Response');
        }
        return response.json();
    }).then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = '/admin/dashb.html';
    }).catch(error => {
        console.log('Error ', error);
        contedorError.textContent = 'User or Password are Incorrect';
    });

});
