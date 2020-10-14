// write your code here
document.addEventListener("DOMContentLoaded", ()=>{
    console.log("hello")
    fetchData()

   


})


function createImage(image){
    const imgId = image.id
    const container = document.querySelector('.image-container')
    
    const imageCard = document.createElement('div')
    imageCard.className = 'image-card'
    imageCard.id = `big-card-${imgId}`
    

    const h2 = document.createElement('div')
    h2.className = 'title'
    h2.innerHTML = image.title

    const img = document.createElement('img')
    img.className = 'image'
    img.setAttribute('src', image.image)

    const likesDiv = document.createElement('div')
    likesDiv.className = 'likes-section'
    

    const likeSpan = document.createElement('span')
    likeSpan.className = 'likes'
    likeSpan.innerHTML = `${image.likes} likes`

    const heartBtn = document.createElement('btn')
    heartBtn.className = 'like-button'
    heartBtn.innerHTML = '♥'

    const commentList = document.createElement('ul')
    commentList.className = 'comments'
    commentList.id = `card-${imgId}`

    heartBtn.addEventListener('click', function(e){
        
        
        const id = image.id

        console.log(id)

        fetch(`http://localhost:3000/images/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                likes: image.likes ++
            })
        }).then(function(response){
            return response.json
        })
        .then(function(obj){
            likeSpan.innerHTML = `${image.likes} likes`
        })

    })

    imageCard.append(h2, img, likesDiv, commentList)
    likesDiv.append(likeSpan, heartBtn)
    container.append(imageCard)

}

function addComments(comment){
    const commentId = comment.imageId
    const card = document.getElementById(`card-${commentId}`)
    
    // const commentList = document.createElement('ul')
    // commentList.className = 'comments'
    
    const firstCom = document.createElement('li')
    firstCom.innerHTML = comment.content
    
    card.append(firstCom)

    const bigCard = document.getElementById(`big-card-${commentId}`)

    comForm = document.createElement('form')
    comForm.className = 'comment-form'
    newCom = document.createElement('input')
    newCom.placeholder = 'Add a comment...'
    newCom.type = 'text'
    newCom.className = 'comment-input'
    addBtn = document.createElement('btn')
    addBtn.className = 'comment-button'
    addBtn.innerHTML = 'Post'

    comForm.append(newCom,addBtn)
    bigCard.append(comForm)
    
 
}



function fetchData(){
    fetch('http://localhost:3000/images')
    .then(function(resposne){
        return resposne.json()
    })
    .then(function(json){
        for (const image of json)
        createImage(image)
    })

    fetch('http://localhost:3000/comments')
    .then(function(resposne){
        return resposne.json()
    })
    .then(function(json){
        for (const comment of json)
        addComments(comment)
    })
    

}

