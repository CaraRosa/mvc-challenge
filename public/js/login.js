document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if(loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username && password) {
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password}),
                })
                .then(respnse => response.json())
                .then(data => {
                    if(data.sucess) {
                        window.location.href='/dashboard'
                    } else {
                        console.error('Login failed:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                });
            }
        });
    }
});