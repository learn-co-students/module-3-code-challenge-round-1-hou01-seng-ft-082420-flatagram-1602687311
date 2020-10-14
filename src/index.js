// write your code here

url = 'http://localhost:3000/images/1'

document.addEventListener('DOMContentLoaded',() =>{

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(post){
    
        // posts.forEach(function(post){
        renderPost(post)
        
    })

    // function renderPost(post){
    //     // console.log(post)
    // const container = document.querySelector('image-container')
    // let div = document.querySelector('div')
    // let title = document.querySelector('title')
    // let img = document.querySelector('img')
    // img.src = img.image
    // console.log(post.image)

    // div.append(img)
    // container.append(div)
    
    // }

    function renderPost(post){
        // console.log(post)
    const div1 = document.createElement('div')
    div1.className = "image-container"
    let div2 = document.createElement('div')
    div2.className = "image-card"
    let h2 = document.createElement('h2')
    h2.className = "title"
    h2.innerText = post.title
    let img = document.createElement('img')
    img.src = post.image
    img.className = "image"
    console.log(post.image)

    div2.append(img,h2)
    div1.append(div2)
    
    }
})
// As a user, I can:

// See the image received from the server, including its title, likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)

// id": 1,
//     "title": "Woofing those bugs away",
//     "likes": 0,
//     "image": "./assets/coder-dog.png"