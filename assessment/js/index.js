console.log("JavaScript file loaded");

// Imports


// Variables & Constants 


// Event Listeners



// Startup code


// Functions -specific behaviours

// Import statements here...

// Variables & Constants 
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    console.log("plusSlides called with:", n);
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";  
}

// Make sure plusSlides is available globally
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

// Functions - general
// Form submission handling

// Load posts from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        addPost(post.content, post.userName, post.userPic);
    });
}

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

function savePostToLocalStorage(content, userName, userPic) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ content, userName, userPic });
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Adding post to the feed
function addPost(content, userName, userPic) {
    const postFeed = document.getElementById('postFeed');
    
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<img src="icons/save_icon.svg" alt=Save" style="width: 20px; height: 20px;" />';   
    
    // Add event listener to the save button
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

    // Append the save button and comment icon
    postDiv.querySelector('.post-actions').appendChild(saveButton);

    // Create the comment button with an icon
    const commentButton = document.createElement('button');
    commentButton.innerHTML = '<img src="icons/comment-icon.svg" alt="Comment" style="width: 25px; height: 25px;" />';
    commentButton.addEventListener('click', function() {
        commentPost(this);
    });
    postDiv.querySelector('.post-actions').appendChild(commentButton);
    
    postFeed.prepend(postDiv); // Add new post at the top
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