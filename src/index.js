
const url = "http://localhost:3000/images/1"


document.addEventListener('DOMContentLoaded', function(){
    console.log("yoooo")
    fetch(url)
    .then(res => res.json())
    .then(data => renderPage(data))

    const form = document.querySelector('.comment-form')

     form.addEventListener('submit', function(e){
        e.preventDefault()
        newComment(e.target)
    })



    function renderPage(data){
        console.log(data)

        const container = document.querySelector('.image-container')

        const imageCardDiv = createEl('div')
        imageCardDiv.className = 'image-card'

        const titleH2 = createEl('h2')
        titleH2.className = 'title'
        titleH2.innerText = data.title

        const img = createEl('img')
        img.src = data.image
        img.className = 'image'

        const likesSection = createEl('div')
        likesSection.className = 'likes-section'

        const numberOfLikes = createEl('span')
        numberOfLikes.className = 'likes'
        numberOfLikes.innerText = `${data.likes} likes`

        const likeButton = createEl('button')
        likeButton.className = 'like-button'
        likeButton.innerText = "♥"

        const comments = createEl('ul')
        comments.className = 'commments'

        const liComments = createEl('li')
        liComments.innerText = data.comments.forEach(comment => help(comment))
        console.log(liComments)
        function help(){
            for (i = 0; i < data.comments.length; i++) {
                return comments[i]
            }//???
        }

        
        // container.append(imageCardDiv, titleH2, img, likesSection, comments)
        comments.append(liComments)
        likesSection.append(numberOfLikes, likeButton)
        imageCardDiv.append(titleH2,img, likesSection, comments, form)
        container.append(imageCardDiv)
        //console.log(container)

        



        //console.log(imageCardDiv, titleH2, img, likesSection, numberOfLikes, likeButton, comments, liComments)


    }
})
function newComment(target){
    //console.log(target)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            // comments: (3) [{…}, {…}, {…}]
            // id: 1
            // image: "./assets/coder-dog.png"
            // likes: 0
            // title: "Woofing those bugs away"    
        })
    })
    
}
function createEl(el){
    return document.createElement(el)
}
// function help(comment){
//     for (i = 0; i < data.comments.length; i++) {
//         return comments[i]
//     }
// }

{/* <div class="image-container">
      <div class="image-card">
        <h2 class="title">Title of image goes here</h2>
        <img src="./assets/image-placeholder.jpg" class="image" />
        <div class="likes-section">
          <span class="likes">0 likes</span>
          <button class="like-button">♥</button>
        </div>
        <ul class="comments">
          <li>Get rid of these comments</li>
          <li>And replace them with the real ones</li>
          <li>From the server</li>
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
      </div>
    </div> */}