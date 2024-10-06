// alert("Javascript works!");
console.log("JavaScript file loaded");


// Event Listeners

// Startup code

// Functions -specific behaviours

// Imports

// Variables & Constants 

// slideIndex variable starts at 1, keeps track of which slide is currently shown.
// let is used for variable declaration and assignment
let slideIndex = 1;
// Shows first slide when page loads
showSlides(slideIndex);


// Next/previous controls
// n can be 1 (next slide) or -1 (prev slide)
function plusSlides(n) {
    // Updates slideIndex by adding n to it, then calls showSlides to show new slide.
    showSlides(slideIndex += n);
}

// Thumbnail image controls
// To jump to specific slide based on thumbnail clicked + n = no. of slide to display
function currentSlide(n) {
    // sets slideIndex to n and shows that slide
    showSlides(slideIndex = n);
}

// Handles display of the slides
function showSlides(n) {
    let i;
    // gets elements with mySlides class (slideshow images) into an array of objects and assign to variable slides
    let slides = document.getElementsByClassName("mySlides");
    // gets elements with dot class (active slide dots)
    let dots = document.getElementsByClassName("dot");


    // if slideIndex goes beyond no. of slides, it goes back to 1 (carousels back)
    // if slideIndex is lower than 1, sets slideIndex to last slide
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    // Loops through each slide and sets display to none (to hide)
    // As long as slide is less than the total no of slides, loop will run
    for (i = 0; i < slides.length; i++) { // i = i + 1
        // Ensuring all slides are hidden before current active slide is displayed (so one slide at a time)
        slides[i].style.display = "none";  
    }

    // Current slide is shown by setting display to block
    slides[slideIndex-1].style.display = "block";  
}

// Make sure plusSlides is available globally
// Can call them directly from HTML
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

// Functions - general


/* Events page carousel */
let currentIndex = 0;
// All elements with class carousel-image is stored in a constant called images.
// const - keeps list of images intact throughout the script, easily access and manipulate all images
// querySelectorAll - allows you to loop through selected elements using methods like forEach.
const images = document.querySelectorAll('.carousel-image');


// Updates which image is shown based on currentIndex.
function showCarouselSlides() {
    // For each img, it gets position in list
    images.forEach((img, index) => {
        // If index matches currentIndex, display is set to block, else none.
        img.style.display = (index === currentIndex) ? 'block' : 'none';
    });

    // Move the carousel based on the current index
    // If index is 0, multiply by 100, offset is 0, index 1 will be offset -100, etc
    const offset = -currentIndex * 100;
    // Moves entire carousel by applying a CSS transformation based on offset calculated
    // Specifies which element(s) you want to select (element with the class name carousel(holds all images))
    // CSS transform property is accessed
    // Offset value replaces $offset and is a % for which the image should translate in the x direction
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Changes image based on direction -1 or 1
function changeSlide(direction) {
    // currentIndex is updated by adding direction
    currentIndex += direction;

    // Loop around if we go out of bounds
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Loop to last image
    } else if (currentIndex >= images.length) {
        currentIndex = 0; // Loop to first image
    }
    // Update displayed image
    showCarouselSlides();
}

// Wait for the entire HTML doc is loaded, then initialize the carousel, ensuring that carousel is shown when page opens
document.addEventListener('DOMContentLoaded', function() { // Inside anon function, call showCarouselSlides
    showCarouselSlides();
});

// Expose changeSlide function globally
window.changeSlide = changeSlide;



// Form submission handling

document.addEventListener('DOMContentLoaded', function() {
    // Load posts from Local Storage on page load
    loadPosts();

    document.getElementById('postForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        const postContent = document.getElementById('postContent').value;
        const userName = "Claire Williams"; // Replace with actual user name
        const userPic = "./images/user_profile.jpg"; // Replace with actual user picture path

        if (postContent) {
            addPost(postContent, userName, userPic);
            document.getElementById('postContent').value = ''; // Clear the textarea
        }
    });

    showCarouselSlides();  // Initialize carousel
});


// Load posts from Local Storage on page load


// Load posts
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        addPost(post.content, post.userName, post.userPic);
    });
}

// Adding post to the feed
function addPost(content, userName, userPic) {
    const postFeed = document.getElementById('postFeed');
    
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<img src="icons/save_icon.svg" alt=Save" style="width: 20px; height: 20px;" />';   
    
    saveButton.addEventListener('click', function() {
        savePost(this);
    });

    postDiv.innerHTML = `
    <div class="user-info">
        <img src="${userPic}" alt="${userName}'s profile picture">
        <strong>${userName}</strong>
    </div>
    <div class="post-content">${content}</div>
    <div class="post-actions">
        <button class="like-button" onclick="toggleLike(this)">
            <span class="heart">&#10084;</span>
        </button>
    </div>
`;

    postDiv.querySelector('.post-actions').appendChild(saveButton);

    const commentButton = document.createElement('button');
    commentButton.innerHTML = '<img src="icons/comment-icon.svg" alt="Comment" style="width: 25px; height: 25px;" />';
    commentButton.addEventListener('click', function() {
        commentPost(this);
    });
    postDiv.querySelector('.post-actions').appendChild(commentButton);
    
    postFeed.prepend(postDiv);
}

// Toggle like functionality
function toggleLike(button) {
    const heart = button.querySelector('.heart');
    button.classList.toggle('liked'); // Toggle the 'liked' class

    // Change heart color based on the 'liked' class
    if (button.classList.contains('liked')) {
        heart.style.color = 'red'; // Change heart color to red
    } else {
        heart.style.color = '#ccc'; // Change heart color back to default
    }
}

window.toggleLike = toggleLike;

function commentPost(button) {
    alert("Comment functionality not implemented yet.");
}

function savePost(button) {
    const img = button.querySelector('img'); // Get the img element inside the button
    if (img.src.includes('icons/save_icon.svg')) {
        img.src = 'icons/saved-icon.svg'; // Change to saved icon
    } else {
        img.src = 'icons/save_icon.svg'; // Change back to save icon
    }
}

window.savePost = savePost;
