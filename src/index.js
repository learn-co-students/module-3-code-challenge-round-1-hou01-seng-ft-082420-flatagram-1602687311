// write your code here
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded")
})

const urlBase = 'http://localhost:3000/images/1'
const commUrl = 'http://localhost:3000/comments'

fetch(urlBase).then(res => res.json()).then(picture => renderPic(picture))

function renderPic(picture){
    const titleH2 = document.querySelector('.title')
    titleH2.innerText = picture.title

    const img = document.querySelector('.image')
    img.src = picture.image

    const likes = document.querySelector('.likes')
    likes.innerText = `${picture.likes} Likes`

    const likeBtn = document.querySelector('.like-button')

    const likesSection = document.querySelector('.likes-section')
    const dwnvtBtn = document.createElement('button')
    dwnvtBtn.innerText = "👎"
    likesSection.append(dwnvtBtn)
    

    const commentUl = document.querySelector('.comments')
    commentUl.innerHTML = ''
    commentDisplay(picture.comments, commentUl)

    likeBtn.addEventListener('click', e => {
        console.log("A Like? How flattering")
        like(likes)
    })

    dwnvtBtn.addEventListener('click', e => {
        console.log("A downvote? How rude")
        downVote(likes)
    })

    let form = document.querySelector('.comment-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        console.log("click", e.target[0].value)
        addComment(e.target[0].value, picture.id, commentUl)
        form.reset()
    })
}

function commentDisplay(comments, ul){
    for(const comment of comments){
        let li = document.createElement('li')
        li.innerText = comment.content
        const dangerBtn = document.createElement('button')
        dangerBtn.style = "background-color: salmon; color: white;"
        dangerBtn.innerText = "delete"
        ul.append(li, dangerBtn)

        dangerBtn.addEventListener('click', () => {
            console.log("click", comment.id)
            fetch(commUrl + `/${comment.id}`, {
                method: 'DELETE'
            })
            .then(function(){
                dangerBtn.remove()
                li.remove()
            })
        })
        
    }
    
}

function newCommentDisplay(comment, ul){
    
        let li = document.createElement('li')
        li.innerText = comment.content
        const dangerBtn = document.createElement('button')
        dangerBtn.style = "background-color: salmon; color: white;"
        dangerBtn.innerText = "delete"
        ul.append(li, dangerBtn)

        dangerBtn.addEventListener('click', () => {
            console.log("click", comment.id)
            fetch(commUrl + `/${comment.id}`, {
                method: 'DELETE'
            })
            .then(function(){
                dangerBtn.remove()
                li.remove()
            })
        })
    
}


function like(likes){
    let newLikes = parseInt(likes.innerText) + 1
    console.log(newLikes)
    fetch(urlBase, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'likes': newLikes
        })
    })
    .then(res => res.json())
    .then((picture) => likes.innerText = `${picture.likes} Likes`)
}

function downVote(likes){
    let newLikes = parseInt(likes.innerText) - 1
    console.log(newLikes)
    fetch(urlBase, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'likes': newLikes
        })
    })
    .then(res => res.json())
    .then((picture) => likes.innerText = `${picture.likes} Likes`)
}

function addComment(comment, imageId, ul){
    console.log("comment function")
    fetch(commUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'imageId': imageId,
            'content': comment
        })
    })
    .then(res => res.json()).then(comm => newCommentDisplay(comm, ul))
}