document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');

if(commentForm) {
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const commentTextArea = document.getElementById('comment');
        const commentContent = commentTextArea.value.trim();

        if (commentContent) {
            fetch(commentForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: commentContent }),
            })
            .then(response => response.json())
            .then(data => {
                if(data.sucess) {
                    appendCommentToUI(data.comment)
                    commentTextArea.value = '';
                } else {
                    console.error('Failed to add a comment', data.error);
                }
            })
            .catch(error => {
                console.error('Error during comment submission:', error);
            });
        }
    });
}

function appendCommentToUI(comment) {
    const commentsSection = document.getElementById('commentsSection');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <p>${comment.comment}</p>
      <p>By: ${comment.commenter}</p>
      <p>Date: ${comment.date}</p>
    `;
    commentsSection.appendChild(commentDiv);
  }
});