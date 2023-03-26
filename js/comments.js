class Comment {
  constructor(text, user, date) {
    this.text = text;
    this.user = user;
    this.date = date;
  }

  edit(text) {
    this.text = text;
  }

  delete() {
    this.text = "";
  }
}

function createComment(text, user, date) {
  return new Comment(text, user, date);
}

function getActualDate() {
  const date = new Date();

  return date.toLocaleDateString();
}

// Interaction with the DOM
setTimeout(() => {
  const form = document.querySelector(".comments-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = form.elements.comment.value;
    const user = form.elements.user.value;
    const date = getActualDate();

    const comment = createComment(text, user, date);

    form.reset();
    createCommentCard(comment);
  });

  addDeleteListener();
  addEditListener();
}, 1000);

function addEditListener() {
  const editBtns = document.querySelectorAll(".edit-comment");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const commentCard = e.target.parentElement.parentElement.parentElement;
      const commentText =
        commentCard.childNodes[1].childNodes[1].childNodes[3].children[0];

      commentText.setAttribute("contentEditable", true);

      commentText.focus();
    });
  });
}

function addDeleteListener() {
  const deleteBtns = document.querySelectorAll(".delete-comment");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const commentCard = e.target.parentElement.parentElement.parentElement;

      commentCard.remove();
    });
  });
}

function insertComment(commentCard) {
  const commentsContainer = document.querySelector(".comments-container");

  commentsContainer.appendChild(commentCard.body.firstChild);

  addEditListener();
  addDeleteListener();
}

function createCommentCard(comment) {
  const { text, user, date } = comment;
  const randomNumber = Math.floor(Math.random() * 80) + 1;

  const stringElement = `
            <div class="comment-card">
                <div class="card-top-part">
                    <div class="left-part">
                        <div class="user-name">
                            <p class="user-name__name">${user}</p>
                            <p class="user-name__comment-date">${date}</p>
                        </div>
                        <div class="comment">
                            <p class="comment__text">
                                ${text}
                            </p>
                        </div>
                    </div>
                    <div class="right-part">
                        <div class="user-photo">
                            <img class="user-photo__photo" src="${
                              randomNumber % 2 === 0
                                ? `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`
                                : `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`
                            }"
                                class="photo">
                        </div>
                    </div>
                </div>
        <div class="card-bottom-part">
            <div class="bottom-part">
                <a class="link edit-comment">
                    <span class="icon">
                        <img src="./assets/icons/icons8-pencil-20.png" alt="edit icon">
                    </span>
                    Edit
                </a>
            </div>
            <div class="bottom-part">
                <a class="link delete-comment">
                    <span class="icon">
                        <img src="./assets/icons/icons8-remove-20.png" alt="remove icon">
                    </span>
                    Delete
                </a>
            </div>
        </div>
    </div>
    `;
  const commentCard = new DOMParser().parseFromString(
    stringElement,
    "text/html"
  );

  insertComment(commentCard);
}
