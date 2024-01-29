const ALL_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const selectElement = document.querySelector('#dog-breed');

fetch(ALL_BREEDS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
        // console.log(data);
        const breedObject = data.message;
        const breedArray = Object.keys(breedObject);  // Object.keys() returns an array of the keys in an object 
        
        for (let i=0; i < breedArray.length; i++){

            const selectOption = document.createElement('option');
            selectOption.value = breedArray[i];
            selectOption.innerText = breedArray[i];
            selectElement.appendChild(selectOption);
        }
    });


    selectElement
    .addEventListener('change', function(event){
    // listening whenever user changes to something elese
    const selectedBreed = event.target.value; // or event.target because selectElement === event.target 

    displayImage(selectedBreed);
    })

function displayImage(selectedBreed){
    let breedUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
    
    fetch(breedUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const img = document.createElement('img');
        img.src = data.message;
        img.alt = 'dog image';
        
        document.querySelector('.breed-img').removeChild(document.querySelector('.breed-img').firstChild);
        document.querySelector('.breed-img').appendChild(img);
    })
}

