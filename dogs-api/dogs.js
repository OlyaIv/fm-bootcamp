const BREADS_URL = 'https://dog.ceo/api/breeds/image/random';


function addDoggo(){
    fetch(BREADS_URL)
    .then(function(response){
       return response.json(); 
    })
    .then(function(data){
    const img = document.createElement('img');
    img.src = data.message;
    img.alt = 'dog image';

    document.querySelector('.doggos').appendChild(img); // append the image to the doggos div
    })
}

document.querySelector('.add-dog')
        .addEventListener("click", addDoggo)
