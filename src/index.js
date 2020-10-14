// write your code here

let imageURL = 'http://localhost:3000/images/1'
document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.querySelector('.image-container');
    const getImage = document.getElementById('log')
    logBtn.addEventListener('click', fetchData);

    async function fetchData(){
        const resp = await fetch(imageURL);
        const data = await resp.json();

        data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                console.log(`${key}, ${value}`);
            });
            console.log(' ')
        })
    }
    }


    // // fetch(imageURL)
    // // .then(function(resp){
    // //     return resp.json()
    // // })
    // // .then(function(images){
    // //    image.for (function(image){
    // //         renderImage(image)
    // //     })
    // })
    function renderImage(image){

        let imageCard = document.createElement('div')
        imageCard.className = 'card'

        let imageTitle = document.createElement('h2')
        imageTitle.innerText = image.title 

        let imageLikes = document.createElement('p')
        imageLikes.innerText = image.likes


    }
})
