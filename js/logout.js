document.getElementById('btn_logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});
