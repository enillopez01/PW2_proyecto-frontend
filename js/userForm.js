const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const mode = urlParams.get('Mode');

const token = localStorage.getItem('token');
console.log(token);
if (!token) {
    window.location.href = '/login.html';
}

const URL = 'http://localhost:3000/user/' + id;
const form = document.querySelector('#form3-users');
const IdInput = document.querySelector('#ID');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const genderInput = document.querySelector('#gender');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const messageDiv = document.querySelector('#error-container');

let MetodoHTTP = '';
if (mode === 'INS') {
    MetodoHTTP = 'POST';
}
else if (mode === 'UPD') {
    MetodoHTTP = 'PUT';
}
else if (mode === 'DLT') {
    MetodoHTTP = 'DELETE';
}


if (mode === 'INS' || mode === 'UPD' || mode === 'DLT') {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = nameInput.value;
        const surname = surnameInput.value;
        const gender = genderInput.value;
        const phone = phoneInput.value;
        const email = emailInput.value;

        fetch(URL, {
            method: MetodoHTTP,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ name, surname, gender, phone, email })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Unsuccessfully Response');
            }
            return response.json();
        }).then(data => {
            messageDiv.textContent = 'User Updated Successfully!';
            messageDiv.style.color = 'green';
            window.location.href = '/admin/dashb.html';
        }).catch(error => {
            messageDiv.textContent = 'Error Updating User!';
            messageDiv.style.color = 'red';
            console.error('Error:', error);
        });
    })

    if (mode === 'UPD' || mode === 'DLT') {
        fetch(URL)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Unsatisfactory Response');
            }).then(function (data) {
                IdInput.value = data._id;
                nameInput.value = data.name;
                surnameInput.value = data.surname;
                genderInput.value = data.gender;
                phoneInput.value = data.phone;
                emailInput.value = data.email;

            }).catch(error => {
                console.log('Error ', error);
                messageDiv.textContent = 'Usuario o contraseña incorrecta';
            });
    }

}