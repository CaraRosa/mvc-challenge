document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('sign_up_form');

    if(signUpForm) {
        signUpForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if(!username || !password) {
                alert('Please fill in all fields.');
                return;
            }

            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaiton/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    window.location.href='/login';
                } else {
                    alert(data.error || 'Failed to sign up');
                }
            })
            .catch(error => {
                console.error('Error during signup:', error);
                alert('An error occurred while signing up.');
            });
        });
    }
});