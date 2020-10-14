// write your code here


console.log("ERE")


const urlimg = "http://localhost:3000/images/"
const urlcom = "http://localhost:3000/comments/"

const ogdiv = document.querySelector(".image-container")
const form = document.querySelector(".comment-form")

fetch(urlimg).then(response => response.json()).then(pictures => pictures.forEach(picture => createPosts(picture)))


function createPosts(pictures) {

    const divbody = document.createElement('div')
    divbody.className = "image-card"

    const h2 = document.createElement('h2')
    h2.className = "title"
    h2.innerText = pictures.title

    const img = document.createElement('img')
    img.className = "image"
    img.src = pictures.image


    const div2 = document.createElement('div')
    div2.className = "likes-section"


    const span = document.createElement('span')
    span.className = "likes"
    span.innerText = `${pictures.likes} Likes`

    const button = document.createElement('button')
    button.className = "like-button"
    button.innerText = "♥"

        // DELETE
    const dltbutton = document.createElement('button')
        dltbutton.className = "delete"
        dltbutton.innerText = "DELETE ME"
        dltbutton.addEventListener('click', event => {
            event.preventDefault()
            fetch(url + pictures.id, 
                {
                    method: "DELETE"
                })
                ogdiv.remove()
        })




    fetch(urlcom).then(response => response.json()).then(comments => comments.forEach(comment => createComments(comment)))
    function createComments(comments) {
        const ul = document.createElement('ul')
        ul.className = "comments"
    
        const li = document.createElement('li')
        li.className = "content"
        li.innerText = comments.conent
    }

    let li = document.querySelector(".content")
    let ul = document.querySelector(".comments")
    div2.append(span,button)
    ul.append(li)
    divbody.append(h2,img,div2,ul,form,dltbutton)
    ogdiv.append(divbody)

    
    
     // POST
     form.addEventListener("submit" , event => {
        event.preventDefault()
        fetch(urlcom, {
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }, 
        body : JSON.stringify ({
            "conent": event.target.comment.value
        })
    }).then(response => response.json()).then(newComment => createComments(newComment))
     })


    // PATCH
    button.addEventListener('click', event => {
        event.preventDefault()
        let likes = parseInt(pictures.likes++)
        fetch(urlimg + pictures.id, {
            method : "PATCH",
            Headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify ({
                "likes": likes
            })
        }).then(response => response.json()).then(() => span.innerText = likes)
    })
}

   
    







