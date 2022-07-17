async function deleteFormHandler(event) {
    event.preventDefault();

    await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);