document.addEventListener('DOMContentLoaded', function () {
    const addPostForm = document.getElementById('addPostForm');

    if(addPostForm) {
        addPostForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const titleInput = document.getElementById('title');
            const contentTextArea = document.getElementById('content');
            
            const title = titleInput.value.trim();
            const content = contentTextArea.value.trim();

            fetch('/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content}),
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    window.location.href='/dashboard';
                } else {
                    console.error('Failed to add a post:', data.error);
                }
            })
            .catch(error => {
                console.error('Error during post submission:', error);
            });
        });
    }
});