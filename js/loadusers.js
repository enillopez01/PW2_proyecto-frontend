fetch('http://localhost:3000/user')
.then(function(response){
    if(response.ok){ 
        return response.json();
    }
    throw new Error('Unsuccessful Response');
}).then(function(data){
    let tableBody = document.querySelector('#tbl-users tbody');
    console.log(data);
    data.forEach(function(item){
        let row = tableBody.insertRow();
        row.insertCell().textContent = item._id;
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.surname;
        row.insertCell().textContent = item.gender;
        row.insertCell().textContent = item.phone;
        row.insertCell().textContent = item.email;


        let linkCellUpdate = row.insertCell();
        let linkUpdate = document.createElement('a');
        linkUpdate.href = '/admin/userForm.html?Mode=UPD&id='+item._id;
        linkUpdate.textContent = 'Actualizar Registro';
        linkCellUpdate.appendChild(linkUpdate);

        let linkCellDelete = row.insertCell();
        let linkDelete = document.createElement('a');
        linkDelete.href = '/admin/userForm.html?Mode=DLT&id='+item._id;
        linkDelete.textContent = 'Eliminar Registro';
        linkCellDelete.appendChild(linkDelete);

    });
}).catch(function(error){
    console.log(error);
})