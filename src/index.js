// write your code here
const url = "http://localhost:3000/images/"
const test = "http://localhost:3000/images?_embed=comments"
const com = "http://localhost:3000/comments/"

document.addEventListener('DOMContentLoaded', ()=>{

    fetch(test).then(res=>res.json()).then(images=>images.forEach(img=>showPosts(img)))

})

function showPosts(post){
    console.log(post)
    let likes = post.likes
    const container = document.querySelector(".image-container")
    const card = document.createElement('div')
    const title = document.createElement('h2')
    const pic = document.createElement('img')
    const divLike = document.createElement('div')
    let spanLike = document.createElement('span')
    const btnLike = document.createElement('button')
    const comments = document.createElement('ul')
    const btnDown = document.createElement('button')

    //assigning all attributes to the above created elements
    card.className = "image-card"
    title.className = "title"
    title.innerText = post.title
    pic.src = post.image
    pic.className = "image"
    divLike.className = "likes-section"
    spanLike.className = "likes"
    spanLike.innerText = `${post.likes} likes`
    btnLike.className = "like-button"
    btnLike.innerText = "♥"
    comments.className = "comments"
    btnDown.className = "like-button"
    btnDown.innerText = "X"


    //adding likes even after a refresh
    btnLike.addEventListener("click", e=>{
        console.log(e.target.value)
        let newLikes = likes + 1
        fetch(url + post.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                likes: newLikes
            })
        }).then(res=>res.json()).then((data)=>{
            likes = data.likes
            spanLike.innerText = `${data.likes} likes`
        })
    })

    btnDown.addEventListener("click", e=>{
        console.log(e.target.value)
        let newLikes = likes - 1
        fetch(url + post.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                likes: newLikes
            })
        }).then(res=>res.json()).then((data)=>{
            likes = data.likes
            spanLike.innerText = `${data.likes} likes`
        })
    })
    

    //All the Form nonsense to create a new comment
    //Need to add event listener
    const form = document.createElement('form')
    const input = document.createElement('input')
    const btnSubmit = document.createElement('button')
    form.className = "comment-form"
    input.className = "comment-input"
    input.type = "text"
    input.name = "comment"
    input.placeholder = "Add a comment..."
    btnSubmit.className = "comment-button"
    btnSubmit.type = "submit"
    btnSubmit.innerText = "Post"

    form.append(input, btnSubmit)

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let newComment = e.target[0].value
        fetch(com, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                content: newComment,
                imageId: post.id
            })
        }).then(res=>res.json()).then(comment=>createComment(comment))
        form.reset()
    })

    post.comments.forEach(comment=> createComment(comment))

    function createComment(comment){
        let li = document.createElement('li')
        const btnDel = document.createElement('button')
        li.innerText = comment.content
        btnDel.innerText = "Del"
        btnDel.className = "comment-button"
        btnDel.addEventListener("click", e=>{
            fetch(com + comment.id, {
                method: 'DELETE'
                }).then(li.remove())
            })
        li.append(btnDel)
        comments.append(li)
        
    }

    //appending everything to show up on the home screen

    divLike.append(spanLike, btnLike, btnDown)
    card.append(title, pic, divLike, comments, form)
    container.append(card)
    

}

