    fetch("http://localhost:3000/images")
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        for(img of json) {
            let h2 = document.querySelector(".title")
            h2.innerHTML = img.title
            let imgs = document.querySelector(".image")
            imgs.src = img.image
            let love = document.querySelector(".likes")
            love.innerHTML = `${img.likes} likes`
        }
       
    })

    fetch("http://localhost:3000/comments")
        .then(function(response) {
            return response.json()
        })
        .then(function(json) { 
            let first = json[0]
            let second = json[1]
            let third = json[2]
               let li1 = document.querySelector("#a")
               let li2 = document.querySelector("#b")
               let li3 = document.querySelector("#c")
               li1.innerHTML = first.content
               li2.innerHTML = second.content
               li3.innerHTML = third.content
        })


        let form = document.querySelector(".comment-form")
        form.addEventListener("submit", function(e) {
            e.preventDefault()
            
            let input = document.querySelector(".comment-input").value
            useIt(input)
            form.reset()
        })
        

        function createForm(comment) {
            let comments = document.querySelector(".comments")
            let li = document.createElement("li")
            li.innerHTML = comment 
            comments.append(li)
        }
      
        function useIt(input) {
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                content: input 
            })
            
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        createForm(input)
    })
}

let loveBtn = document.querySelector(".like-button")
let loves = document.querySelector(".likes")

loveBtn.addEventListener("click", function(e) {
   loves.innerText = ++ e.target.value
   fetch(`http://localhost:3000/images/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        likes: e.target.value 
    })
})
 
   
})


       
        