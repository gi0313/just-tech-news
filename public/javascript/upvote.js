const { response } = require("express");

async function upvoteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').atlength - 1
    ];

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);