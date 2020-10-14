// write your code here
const baseURL = 'http://localhost:3000/'

document.addEventListener("DOMContentLoaded", function(){
  getImages(baseURL)
  console.log("We're loaded up!")
})

const getImages = url => {
  fetch(url + 'images')
  .then(res => res.json())
  .then(images => images.forEach(image => makeImageCard(image)))
}
const makeImageCard = image => {
    let imgCont = document.querySelector('.image-container')
        
    let imgCard = createEl('div')
    imgCard.className = "image-card"

    let titleH2 = createEl('h2')
    titleH2.className = 'title'
    titleH2.innerText = image.title

    let img = createEl('img')
    img.className = 'image'
    img.setAttribute('src', image.image)

    // likes div
    let likesDiv = createEl('div')
    likesDiv.className = 'likes-section'

    let likesSpan = createEl('span')
    likesSpan.className = 'likes'
    likesSpan.innerText = `${image.likes} likes`

    let likeBtn = createEl('button')
    likeBtn.className = 'like-button'
    likeBtn.innerText = '❤️'
    likeBtn.addEventListener('click', function(e){
        let likeUpdate = {
            likes: image.likes++
        }
        const imageOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(likeUpdate)
        }
        fetch(baseURL + `images/${image.id}`, imageOptions)
        .then(res => res.json())
        .then(image => likesSpan.innerText = `${image.likes} likes`)

    })

    //comments div
    let commentsList = createEl('ul')
    commentsList.className = 'comments'

    let commentForm = createEl('form')

    let commentInput = createEl('input')
    commentInput.className = "comment-input"
    commentInput.type = 'text'
    commentInput.name = 'comment'
    commentInput.placeholder = 'Add a comment...'

    let commentBtn = createEl('button')
    commentBtn.className = 'comment-button'
    commentBtn.type = 'submit'
    commentBtn.innerText = "Post"

    fetch(baseURL + 'comments')
    .then(res => res.json())
    .then(comments => comments.forEach(comment => renderComment(comment)))

    commentForm.addEventListener('submit', function(e){
        e.preventDefault()
        console.log(`A Comment was submitted! => ${e.target.comment.value}`)
        let newComment = e.target.comment.value
        let commentData = {
            imageId: image.id,
            content: newComment
        }
        let commentOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(commentData)
        }
        fetch(baseURL + 'comments', commentOptions)
        .then(res => res.json())
        .then(comment => renderComment(comment))
        commentForm.reset()
    })

    function renderComment(comment) {
        let li = createEl('li')
            li.innerText = comment.content
            commentsList.append(li)
    }

    commentForm.append(commentInput, commentBtn)
    likesDiv.append(likesSpan, likeBtn)
    imgCard.append(titleH2, img, likesDiv, commentsList, commentForm)
    imgCont.append(imgCard)
}

const createEl = el => {
  return document.createElement(el)
}
