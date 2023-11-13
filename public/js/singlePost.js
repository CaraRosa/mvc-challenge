document.addEventListener('DOMContentLoaded', () => {
    const viewFullPostButton = document.querySelector('viewFullPostButton')
    viewFullPostButton.forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.getAttribute('data-post-id');
            window.location.href = `/post/${postId}`;
        });
    });
});