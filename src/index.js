// write your code here
let dogUrl = "http://localhost:3000/images/1"
let dogComment = "http://localhost:3000/comments"

// let imgContainer = document.querySelector('.image-container')

let cardComments = document.querySelector('.comments')
cardComments.innerHTML = ""

fetch(dogUrl)
.then(function(resp){
    return resp.json()
})
.then(function(dog){
    renderDog(dog)
    for(const comment of dog.comments){
        let li = document.createElement('li')
        li.append(comment.content)
        cardComments.append(li)
    }
})

function renderDog(dog){
    let h2 = document.querySelector('.title')
        h2.innerText = `${dog.title}`
    let img = document.querySelector('.image')
        img.src = dog.image
    let likes = document.querySelector('.likes')
        likes.innerText = `${dog.likes} likes`
    let btn = document.querySelector('.like-button')
        btn.addEventListener('click', function(){
            likes.innerText = `${dog.likes++} likes` 
        })
}

let form = document.querySelector('.comment-form')
form.addEventListener('submit',function(e){
    e.preventDefault()
    let comment = document.querySelector('.comment-input').value
    fetch(dogComment, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "Accept":"applicatiion/json"
        },
        body: JSON.stringify({
            "content": comment
        })
    })
    .then(function(resp){
        return resp.json
    })
    .then(function(data){
        console.log(data)
    })
        
})

