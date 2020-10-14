let imageURL = "http://localhost:3000/images"
let commentURL =  "http://localhost:3000/comments"
// write your code here
document.addEventListener('DOMContentLoaded', () => {
    // console.log("hi")

fetch(imageURL).then(res => res.json()).then(images => images.forEach(image => createImageCard(image)))

    function createImageCard(image){
        // console.log(image)
        const divContainer = document.querySelector(".image-container")
        const divCard = document.querySelector(".image-card")

        const h2 = document.createElement('h2')
        h2.setAttribute("class", "title")
        h2.innerText = image.title 

        const img = document.createElement('img')
        img.setAttribute("src", image.image)
        img.setAttribute("class", "image")

        const divLike = document.querySelector(".likes-section")

        const span = document.createElement('span')
        span.setAttribute("class", "likes")
        span.innerText = `Likes: ${image.likes}`

        const button = document.createElement("button")
        button.setAttribute("class", "like-button")
        button.setAttribute('id', image.id)
        button.addEventListener('click',e => {
            let likes = parseInt(span.innerText) = 1

            fetch(imageURL + e.target.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    'likes': likes
                })
            })
        })
        // end of button event listener

        const ul = document.querySelector(".comments")
        const li1 = document.createElement('li')
        li1.innerText = "Get rid of these comment"

        const li2 = document.createElement('li')
        li2.innerText = "And replace them with the real ones"

        const li3 = document.createElement('li')
        li3.innerText = "From the serve"


        const f = document.querySelector(".comment-form")
        f.addEventListener("submit", e => {
            e.preventDefault()
            const comment = document.querySelector(".comment-input")
            fetch(commentURL, {
            method:"POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: comment.value
        })

            })
        .then(res => res.json())
        .then(comment => createComment(comment))
            // end of fetch


        })
        // end of listener
        

        divContainer.append(divCard)
        divCard.append(h2, img, ul)
        divLike.append(span, button)
        ul.append(li1, li2, li3, f)


    }

    function createComment(comment){
        const ul = document.querySelector(".comments")
        const li1 = document.createElement('li')
        li1.innerText = "Get rid of these comment"

        const li2 = document.createElement('li')
        li2.innerText = "And replace them with the real ones"

        const li3 = document.createElement('li')
        li3.innerText = "LI"

        ul.append(li1, li2, li3)
        
    }



})
// end of dom content loaded
