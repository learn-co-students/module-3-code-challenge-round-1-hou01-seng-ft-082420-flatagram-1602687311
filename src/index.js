const url = "http://localhost:3000"

function getImage() {
    fetch(url + "/images/1")
        .then(res => res.json())
        .then(image => {
            renderImage(image);
        })
}

function getComments() {
    fetch(url + "/comments")
        .then(res => res.json())
        .then(comments => {
            comments.forEach(comment => {
                renderComment(comment);
            })
        })
}

function renderComment(comment) {
    const ul = document.getElementById("comments")
    const li = document.createElement("li")
    li.innerHTML = comment.content
    const delBtn = document.createElement("button")
    delBtn.innerHTML = "Delete"
    delBtn.addEventListener("click", (e) => {
        fetch(url+`/comments/${comment.id}`, {
            method: "DELETE"
        })
        li.remove()
    })
    li.append(delBtn)
    ul.append(li)
}

function renderImage(image) {
    const title = document.getElementById("title")
    title.innerHTML = image.title

    const itemImage = document.getElementById("image")
    itemImage.src = image.image

    const likes = document.getElementById("likes")
    likes.innerHTML = `${image.likes} likes`

    const likeBtn = document.getElementById("like-button")
    likeBtn.addEventListener("click", (e) => {
        let newLikes = image.likes++
        console.log(newLikes)
        fetch(url + "/images/1", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                likes: newLikes
            })
        })
        likes.innerHTML = `${newLikes} likes`
    })

    const form = document.getElementById("comment-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault;
        const input = document.getElementById("form-input").value
        fetch(url + "/comments", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                content: input,
                imageID: image.id
            })
        })
    })
}

getComments();
getImage();