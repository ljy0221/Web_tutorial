const { text, application, json } = require("express");

const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsForm = document.querySelector("#comments-form form");
const commentTitle = document.getElementById("title");
const commentText = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentsListElement = createCommentsList(responseData);
  commentsSectionElement.innerHTML = "";
  commentsSectionElement.appendChild(commentsListElement);
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsForm.dataset.postid;

  const enteredTitle = commentTitle.value;
  const enteredText = commentText.value;

  const comment = { title: enteredTitle, text: enteredText };

  const result = await fetch(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(comment),
  });

  fetchCommentsForPost();
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsForm.addEventListener("submit", saveComment);
