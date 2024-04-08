$(document).ready(function () {
    $('#tbl-pagination').DataTable({
        language: {
              paginate: {
              
            },
            aria: {
                sortAscending: ": active para ordenar la columna en orden ascendente",
                sortDescending: ": active para ordenar la columna en orden descendente"
            }
        },
        scrollY: 400,
        lengthMenu: [ [5,10, 15, -1], [5, 10, 25, "All"] ],
    });
});