// write your code here
const url = "http://localhost:3000/images/1"

document.addEventListener("DOMContentLoaded", function(){

    fetch(url)
        .then(response => response.json())
        .then(data => renderPost(data))

    document.querySelector(".comments").innerHTML = ""

    const form = document.querySelector(".comment-form")

    form.addEventListener("submit", function(e){
        e.preventDefault()
        console.log(e.target.input)
        postComment(e)
    })

    const likeBtn = document.querySelector(".like-button")

    likeBtn.addEventListener("click", function(){
        fetch(url)
            .then(response => response.json())
            .then(data => likePost(data))
    })

})
function likePost(e){
    let postData = {
        name: e.target.likes.value
    }
    let patchOptions = {
        method: 'PATCH',
        headers:{
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postData)
    }

}


function postComment(e){
    console.log(e.target.input)
    let commentOption = {
        method: "POST",
        headers:{
            "content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify({
            "imageId": 1,
            "content": e.target.comment
        })
    }
    fetch("http://localhost:3000/comments", commentOption)
        .then(function(){
            fetch(url)
            .then(response => response.json())
            .then(data => renderPost(data))
        })
}

function renderPost(data){
    console.log(data.likes)
    const title = document.querySelector(".title")
    const img = document.querySelector(".image")
    const likes = document.querySelector(".like")
    img.src = data.image
    title.innerHTML = data.title
    document.querySelector(".comments").innerHTML = ""
    for(let i = 0; i < data.comments.length; i++){
        console.log(data.comments[i])
        const section = document.querySelector(".comments")
        const comment = document.createElement("li")
        comment.innerHTML = data.comments[i].content
        comment.id = data.comments[i].id
        section.append(comment)
    }
}