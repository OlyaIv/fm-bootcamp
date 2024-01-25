const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const galleryImg = document.querySelectorAll('.gallery-img');
let currentlySelected = 0;

prevBtn.addEventListener('click', function(){
    galleryImg[currentlySelected].classList.remove('active'); // remove active class from currently selected image/element
    currentlySelected--; // decrement currently selected by 1
    galleryImg[currentlySelected].classList.add('active'); // add active class to previous image/element
    nextBtn.disabled = false; // enable next button    
    if (currentlySelected === 0) { // if currently selected is equal to 0
        prevBtn.disabled = true; // disable prev button
    }
})

nextBtn.addEventListener('click', function(){
    galleryImg[currentlySelected].classList.remove('active'); // remove active class from currently selected image/element
    currentlySelected++; // increment currently selected by 1 
    galleryImg[currentlySelected].classList.add('active'); // add active class to next image/element
    prevBtn.disabled = false; // enable prev button
    if (galleryImg.length === currentlySelected + 1) { // if currently selected is equal to the length of the gallery image array
        nextBtn.disabled = true; // disable next button
    }
})
