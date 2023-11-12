document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    if(logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();

            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    window.location.href = '/login'
                } else {
                    console.error('Logout failed:', data.error);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });

        });
    }
});