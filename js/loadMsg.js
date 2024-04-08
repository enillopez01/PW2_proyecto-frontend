const token = localStorage.getItem('token');
console.log(token);
if(!token){
    window.location.href = '/login.html';
}

fetch('http://localhost:3000/message')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Unsuccessful Response');

    }).then(function (data) {
        const tableBody = document.querySelector('#tbl-pagination tbody');
        const paginationDiv = document.getElementById('pagination');
        let currentPage = 1;

        console.log(data);
        data.forEach(function (item) {
            let row = tableBody.insertRow();
          //row.insertCell().textContent = item._id;
            row.insertCell().textContent = item.name;
            row.insertCell().textContent = item.email;
            row.insertCell().textContent = item.phone;
            //row.insertCell().textContent = item.imagefile;
            row.insertCell().textContent = item.message;

        });

        displayPagination(data.length);

        function displayPagination(totalItems) {
            const totalPages = Math.ceil(totalItems / 10); // Assuming 10 items per page
            paginationDiv.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                if (i === currentPage) {
                    button.classList.add('active');
                }
                button.addEventListener('click', () => {
                    currentPage = i;
                    fetchData(currentPage);
                });
                paginationDiv.appendChild(button);
            }
        }

    }).catch(function (error) {
        console.log(error);
    })
