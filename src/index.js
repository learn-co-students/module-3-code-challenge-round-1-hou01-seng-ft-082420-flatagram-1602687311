// write your code here
const imagesURL = "http://localhost:3000/images"
const commentsURL = "http://localhost:3000/comments"
const commentCollection = document.querySelector('.comments')
const imageCollection = document.querySelector('.image-container')
const commentForm = document.querySelector('.comment-form')


document.addEventListener("DOMContentLoaded", function() {
    
    fetch(imagesURL).then(response => response.json())
    .then(images => images.forEach(image => createImageCard(image)))

    function createImageCard(image) {

        //creating elements
        //console.log(image.title, image.likes, image.image, image.id)

        let imageCard = document.createElement('div')
        imageCard.className = "image-card"
        
        let title = document.createElement('h2')
        title.className = "title"
        title.innerText = image.title

        let img = document.createElement('img')
        img.src = image.image
        img.className = "image"
        // console.log(img)

        let likesSection = document.createElement('div')
        likesSection.className  = "likes-section"
        
        let likes = document.createElement('span')
        likes.className = "likes"
        likes.innerText = `${image.likes} likes`

        let likeButton = document.createElement('button')
        likeButton.className = "like-button"
        likeButton.innerText = "♥"
        likeButton.id = image.id
        likeButton.addEventListener("click", e => {
            let likes = parseInt(likeButton.innerText) + 1
            updateimageLikes(likeButton.id, likes)
        })

        likesSection.append(likes, likeButton)

        let commentSection = document.createElement('ul')
        commentSection.className = "comments"

        let comment = document.createElement('li')
        console.log(image.comments)
        // comment.innerText = image.comments
        
        commentSection.append(image.comments)

        // appending elements to card, and card to collection
        imageCard.append(title, img, likesSection, commentSection)
        imageCollection.append(imageCard)

    }
})

function updateimageLikes(imageID, likeCount) {
        
    let updateOption = {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify ({
            'likes': likeCount
        })
    }
    
    // fetch(imagesURL+"/"+imageID, updateOption).then(response => response.json())
    // .then((image) => likeCount.innerText = `${image.likes} likes`)
}

