// write your code here
const imgurl = "http://localhost:3000/images/1"
//const comurl = "http://localhost:3000/comments"

fetch(imgurl)
.then(function(res){
  return res.json()
})
.then(function(img){
  console.log(img)
  imgposter(img)
})

// fetch(comurl)
// .then(function(res){
//   return res.json()
// })
// .then(function(com){
//   console.log(com)
//   for (i = 0; i < com.length; i++){
//     imgposter(com[i])
// }
// })



function imgposter(img){
  console.log(img.comments)
  const hook = document.querySelector('#images')

  const h2 = document.createElement('h2')
  h2.className = "title"
  h2.textContent = img.title

  const img1 = document.createElement('img')
  img1.className = "image"
  img1.src = img.image

  const div = document.createElement("div")
  div.className = "likes-section"

  const span = document.createElement("span")
  span.className = "likes"
  span.textContent = img.likes + " likes"

  const butt = document.createElement("button")
  butt.className = "like-button"
  butt.textContent = "♥"

  const hook2 = document.querySelector("comments")
  
  const li = document.createElement('li')
  li.textContent  = img.comments.forEach

  hook.append(li)

  div.append(span,butt)
  hook.append(h2,img1,div)
}

// function composter(com){
//   const hook = document.querySelector('#comments')

//   const li = document.createElement('li')
//   li.textContent = com.content

//   hook.append(li)
// }


const form = document.querySelector('#comment-form')

form.addEventListener("submit" , function(a){
    console.log(a)
    a.preventDefault()
    let class = document.querySelector('#class').value
    let  type = document.querySelector('#type').value
    let  name = document.querySelector('#name').value
    let  placeholder = document.querySelector('#placeholder').value

    fetch(urlimg,{
        method: 'POST',
        headers: { 
            "Content-type":"application/json",
            "Accept":"applaction/json"
        },
        body: JSON.stringify({
          "class":
          "type":
          "name":
          "placeholder":
        })
    })
    .then(function(response){
        return response.json
    })
    .then(function(data){
        imgposter(data)
    })
}) 