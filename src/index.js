//Global variables 
const baseUrl = "http://localhost:3000"
const imgContainer = document.querySelector('.image-container')

const imgCard = document.querySelector('.image-card')

const title = document.querySelector('.title')

const img = document.querySelector('.image')

const likeSection = document.querySelector('.likes-section')
let likes = document.querySelector('.likes')
const likeBtn = document.querySelector('.like-button')

const comments = document.querySelector('.comments')

const commentForm = document.querySelector('.comment-form')

//destroys annoying preexisting comments that came with the lab
while (comments.firstChild){
    comments.removeChild(comments.firstChild)
}

//Fetch image data to populate post with 
fetch(baseUrl + "/images")
.then(res => res.json())
.then(image => populateImage(image[0]))

//Populate the post with image and like data 
function populateImage(image){

    title.textContent = image.title

    img.setAttribute('src',image.image)

    likes.textContent = `${image.likes} Likes`

    //add like button listener to increment like by one 
    likeBtn.addEventListener('click', function(e){
        addLike(image)
    })

    //add listener to post a new comment
    commentForm.addEventListener('submit', function(e){
        e.preventDefault();
        createComment(image, e.target);
        commentForm.reset();
    })

}


//Fetch comments to populate the post with 
fetch(baseUrl + "/comments")
.then(res=>res.json())
.then(comments => comments.forEach(populateComment))


//Populate the post with it's comments
function populateComment(comment){

    let li = createEl('li');
    li.textContent = comment.content
    
    comments.append(li)

}

//Adds like to db then changes DOM to reflect change
function addLike(image){

    let currentLikes = parseInt(likes.textContent)

    fetch(baseUrl + `/images/${image.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            likes: (currentLikes + 1) 
        })
    })
    .then(res => res.json())
    .then(function(image){
        likes.textContent = `${image.likes} Likes`
    })
}

//Adds new comment to db, then appends to end of comment list
function createComment(image,input){
    let li = createEl('li');
    li.textContent = input.comment.value
    
    comments.append(li)

    // fetch(baseUrl + "/comments", {
    //     method:"POST",
    //     header: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //         imageId: image.id,
    //         content: input.comment.value
    //     })
    // })
    // .then(res => res.json())
    // .then(function(comment){
    //     populateComment(comment)
    // })
}


//helper for creating HTML elements
function createEl(el){
    return document.createElement(el)
}