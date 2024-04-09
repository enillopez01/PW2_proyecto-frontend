/**Autenticacion */

const token = localStorage.getItem('token');
console.log(token);
if (!token) {
    window.location.href = '/login.html';
}

const btnPrevPage = document.getElementById('btnPrevPage');
const btnNextPage = document.getElementById('btnNextPage');
const spanActualPage = document.getElementById('spanActualPage');
let actualPage = 1;
const pageSize = 4; // Tamaño de la página

function loadData(page) {
    fetch(`http://localhost:3000/message?page=${page}&pageSize=${pageSize}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Unsuccessful Response');
        }).then(function (data) {
            let tableBody = document.querySelector('#tbl-message tbody');
            console.log(data);
            // Limpiar la tabla antes de agregar los nuevos datos
            tableBody.innerHTML = '';
            data.forEach(function (item) {
                let row = tableBody.insertRow();
                row.insertCell().textContent = item.name;
                row.insertCell().textContent = item.email;
                row.insertCell().textContent = item.phone;
                row.insertCell().textContent = item.message;

                let linkCellDelete = row.insertCell();
                let linkDelete = document.createElement('button');
                linkDelete.addEventListener('click', () => {
                    let id = item.id;
                    /*window.location.href = '/admin/messages.html?id=' + item._id;*/
                    const URL = 'http://localhost:3000/message/' + id;
                    fetch(URL, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': 'Bearer' + token
                        }
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Unsuccessfully Response')
                        }
                        // Optionally, you can reload the data after successful deletion
                        loadData(actualPage);
                    }).catch(error => {
                        console.error('Error deleting data:', error);
                    });

                })
                linkDelete.textContent = 'Delete'
                linkCellDelete.appendChild(linkDelete);

            });
            spanActualPage.textContent = `Page ${actualPage}`;
        }).catch(function (error) {
            console.error('Error al cargar datos:', error);
        });
}

btnPrevPage.addEventListener('click', () => {
    if (actualPage > 1) {
        actualPage--;
        loadData(actualPage);
    }
});

btnNextPage.addEventListener('click', () => {
    actualPage++;
    loadData(actualPage);
});

loadData(actualPage);
