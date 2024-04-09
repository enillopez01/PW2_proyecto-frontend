/**Autenticacion */

const token = localStorage.getItem('token');
console.log(token);
if (!token) {
    window.location.href = '/login.html';
}
/**Autenticacion */


const btnPrevPage = document.getElementById('btnPrevPage');
const btnNextPage = document.getElementById('btnNextPage');
const spanActualPage = document.getElementById('spanActualPage');


let actualPage = 1;
const pageSize = 4; // Tamaño de la página

function loadData(page) {
    fetch(`http://localhost:3000/user?page=${page}&pageSize=${pageSize}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Unsuccessful Response');
        }).then(function (data) {
            let tableBody = document.querySelector('#tbl-users tbody');
            console.log(data);
            // Limpiar la tabla antes de agregar los nuevos datos
            tableBody.innerHTML = '';
            data.forEach(function (item) {
                let row = tableBody.insertRow();
                row.insertCell().textContent = item._id;
                row.insertCell().textContent = item.name;
                row.insertCell().textContent = item.surname;
                row.insertCell().textContent = item.gender;
                row.insertCell().textContent = item.phone;
                row.insertCell().textContent = item.email;

                let linkCellUpdate = row.insertCell();
                let linkUpdate = document.createElement('button');
                linkUpdate.addEventListener('click', () => {
                    window.location.href = '/admin/userForm.html?Mode=UPD&id=' + item._id;
                })
                linkUpdate.textContent = 'Edit';
                linkCellUpdate.appendChild(linkUpdate);

                let linkCellDelete = row.insertCell();
                let linkDelete = document.createElement('button');
                linkDelete.addEventListener('click', () =>{
                    window.location.href = '/admin/userForm.html?Mode=DLT&id=' + item._id;
                })
                linkDelete.textContent = 'Delete';
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

// Cargar los datos de la página inicial cuando se carga la página
loadData(actualPage);
