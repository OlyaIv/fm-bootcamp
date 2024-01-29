const ALL_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const selectElement = document.querySelector('#dog-breed');
const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.loading-dog');

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

    selectElement.addEventListener('change', function(event){
    // listening whenever user changes to something elese

    let breedUrl = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

    displayImage(breedUrl);
    })
 
    function displayImage(url){
        spinner.classList.add('show');
        img.classList.remove('show');

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            img.src = data.message;
            
            // this is another way to remove the previous image
            // document.querySelector('.breed-img').removeChild(document.querySelector('.breed-img').firstChild);
            // document.querySelector('.breed-img').appendChild(img);
        })
        // spinner.classList.remove('show');
        // img.classList.add('show');
    }

    img.addEventListener('load', function(){
        spinner.classList.remove('show');
        img.classList.add('show');
    })

