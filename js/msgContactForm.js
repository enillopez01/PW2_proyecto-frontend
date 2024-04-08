const URL = 'http://localhost:3000/message';
const form = document.querySelector('#contact-form');
const messageDiv = document.querySelector('#status-container');

const nameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const imagefileInput = document.querySelector('#imagefile');
const messageInput = document.querySelector('#msg');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', nameInput.value);
    formData.append('email', emailInput.value);
    formData.append('phone', phoneInput.value);
    formData.append('imagefile', imagefileInput.files[0]);
    formData.append('message', messageInput.value);

    fetch(URL, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Incorrect server Response');
        }
        return response.json();
    }).then(data => {
        messageDiv.textContent = 'Message sent Successfully!';
        messageDiv.style.color = 'green';
        form.reset();
    }).catch(error => {
        messageDiv.textContent = 'Error sending Message!';
        messageDiv.style.color = 'red';
        console.error('Error:', error);
    });
});
