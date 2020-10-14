// write your code here
document.addEventListener('DomContentLoaded', ()=>{
console.log("html loaded")

const container = document.querySelector("#image-container")

fetch(' http://localhost:3000')

.then(function(res){
    return res.json();
})
.then(function(images){
    console.log(images)

    for (i=0;i<images.length;i++){
       renderImage(images[i])
    }
    
    

});//See the image received from the server, including its title, likes and comments when the page loads
function renderImage(images){
    let div =  document.createElement('div')
    div.className = "image-card"
    

    let h2 = document.createElement('h2')
    h2.className = "title"
    h2.innerText = images.title

    let h3 = document.createElement('h3')
     h3.className = "like-section"
     h3.innerText = "images.likes"







    div.append(h2,h3,)
  
    container.append(div)
    
}

})