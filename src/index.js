const URLBaseImage = "http://localhost:3000/images/"
// const URLBaseCom = "http://localhost:3000/comments/"
const imageCard = document.querySelector(".image-container")
// const comCard = document.querySelector(".comments")

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!')

    fetch(URLBaseImage).then(res => res.json()).then(images => images.forEach(image => createImageCard(image)));
    // fetch(URLBaseCom).then(res => res.json()).then(comments => comments.forEach(comment => createCommentCard(comment)));
    const f = document.querySelector(".comment-form")
    f.addEventListener('submit', e => {
        e.preventDefault()
        console.log(e)
        createNewComment(e.target[0].value)
        f.reset()
    })
    
})//last line of DOM

function createImageCard(image) {

    let div = document.createElement('div')
    div.setAttribute('class', 'image-card')

    let h2 = document.createElement('h2')
    h2.setAttribute('class', 'title')
    h2.innerText = image.title

    let img = document.createElement('img')
    img.setAttribute('src', image.image)
    img.setAttribute('class', 'image')

    let div2 = document.createElement('div')
    div2.setAttribute('class', 'likes-section')

    let span = document.createElement('span')
    span.setAttribute('class', 'likes')
    span.innerText = `${image.likes} likes`

    let likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-button')
    likeBtn.innerText = "♥"
    likeBtn.addEventListener('click', e =>{
        e.preventDefault()

        let likes = parseInt(span.innerText) + 1

        fetch(URLBaseImage + e.target.dispatchEvent, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'likes': likes
            })
        })
        .then(res => res.json())
        .then(() => span.innerText = `${likes} Likes`)
        //come back to get it to persist
    })

    let ul = document.createElement('ul')
    ul.setAttribute('class', 'comments')
        
    let li = document.createElement('li')
    li.innerText = image.comments
    //need to come back to this

    let form = document.createElement('form')
    form.setAttribute('class', 'comment-form')

    let input = document.createElement('input')
    input.setAttribute('class', 'comment-input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'comment')
    input.setAttribute('placeholder', 'Add a comment...')

    let comBtn = document.createElement('button')
    comBtn.setAttribute('class', 'comment-button')
    comBtn.setAttribute('type', 'submit')
    comBtn.innerText = "Post"
    
    div.append(h2, img, div2, ul, form, comBtn)
    div2.append(span, likeBtn)
    imageCard.append(div)
    ul.append(li)
    form.append(input)
}//last line of card

const createNewComment = (comment) => {

    fetch(URLBaseImage, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            'comment': comment
        })
    })
    .then(res => res.json())
    .then(image => createImageCard(image))
}
    
