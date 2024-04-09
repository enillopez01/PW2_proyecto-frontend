const statusDiv = document.getElementById('status');
const token = localStorage.getItem('token');

if (token) {
    updateStatus(true);
}else{
    updateStatus(false);
}

function updateStatus(isLoggedIn) {
    if (isLoggedIn) {
        statusDiv.textContent = 'Signed In';
    } else{
        statusDiv.textContent = 'Log In';
    }

}