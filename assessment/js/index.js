// alert("Javascript works!");
console.log("JavaScript file loaded");



//Community Page slideshow
// slideIndex variable starts at 1, keeps track of which slide is currently shown.
// let is used for variable declaration and assignment
let slideIndex = 1;
// Shows first slide when page loads
showSlides(slideIndex);


// Next/previous controls
// n can be 1 (next slide) or -1 (prev slide) from defined prev and next in plusSlides in html
function plusSlides(n) {
    // Updates slideIndex by adding n to it, then calls showSlides to show new slide.
    showSlides(slideIndex += n);
}

// Jump to a specific slide rather than prev or next from defined dots in currentSlide in html
function currentSlide(n) {
    // sets slideIndex to n and shows that slide
    showSlides(slideIndex = n);
}

// Handles display of the slides
function showSlides(n) {
    // Declare variable i which acts as a loop counter later.
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
        // Iterating through each slide and hiding them first
        slides[i].style.display = "none";  
    }

    // Current slide is shown by setting display to block
    slides[slideIndex-1].style.display = "block";  
}

// Make sure plusSlides is available globally
// Can call them directly from HTML
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;


/* Events page carousel */
//Keeps track of the current slide being displayed
let currentIndex = 0;
// Selects all elements with the class .carousel-image and stores them in the images constant.
// const - keeps list of images intact throughout the script, easily access and manipulate all images
// querySelectorAll - returns a collection of all matching elements (the carousel images)
const images = document.querySelectorAll('.carousel-image');


// Updates which image is shown based on currentIndex.
function showCarouselSlides() {
    // For each img, it gets the image and its position in list
    images.forEach((img, index) => {
        // If image's index matches currentIndex, display is set to block, else none.
        img.style.display = (index === currentIndex) ? 'block' : 'none';
    });

    // Move the carousel based on the current index
    // If index is 0, multiply by 100, offset is 0, index 1 will be offset -100, etc (100% = 1 image)
    // Using const because the variable itself will always refer to the same set of images.
    const offset = -currentIndex * 100;
    /* Moves entire carousel using CSS transformation based on offset calculated */
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
// Waits for all the HTML to be read and processed, then runs the function you defined.
document.addEventListener('DOMContentLoaded', function() {
    //  loads any posts saved previously in Local Storage when the page open
    loadPosts();

    // When 'submitted', the form won’t reload the page (e.preventDefault())
    document.getElementById('postForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        const postContent = document.getElementById('postContent').value;
        const userName = "Claire Williams"; // Replace with actual user name
        const userPic = "./images/user_profile.jpg"; // Replace with actual user picture path

        // Grabs content of post and adds it using addPost()
        if (postContent) {
            addPost(postContent, userName, userPic);
            document.getElementById('postContent').value = ''; // Clear the textarea
        }
    });
});


// Load posts from Local Storage on page load
function loadPosts() {
    // localStorage saves the posts made earlier.
    // JSON.parse converts stored text data back into JavaScript objects.
    const posts = JSON.parse(localStorage.getItem('posts')) || []; // Empty array [] for no posts
    posts.forEach(post => {
        // For each saved post, addPost() is called to add them back to the page
        addPost(post.content, post.userName, post.userPic);
    });
}

// Adding a new post to post feed
function addPost(content, userName, userPic) {
    // Looks for elements in HTML with ID "postFeed" (where posts will be displayed)
    const postFeed = document.getElementById('postFeed');
    
    // creates new div (to hold content) for each post and gives it class name "post" to style it.
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Creates a button to 'save' the post. There is an icon img inside. 
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<img src="icons/save_icon.svg" alt=Save" style="width: 20px; height: 20px;" />';   
    
    // Makes the button clickable (addEventListener)
    saveButton.addEventListener('click', function() {
        // When button is clicked, savePost() is called and changes the icon
        savePost(this);
    });


    // Shows users picture and name
    // Displays the post content
    // Adds a like button icon which when toggled, changes color
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

    // querySelector looks in postDiv (the post container), finds element with class "post-actions"
    // The save button is added inside the post (as an action) alongside like and save buttons
    postDiv.querySelector('.post-actions').appendChild(saveButton);

    // Adding a comment button with an image. When clicked, it displays an alert.
    const commentButton = document.createElement('button');
    commentButton.innerHTML = '<img src="icons/comment-icon.svg" alt="Comment" style="width: 25px; height: 25px;" />';
    commentButton.addEventListener('click', function() {
        commentPost(this);
    });
    postDiv.querySelector('.post-actions').appendChild(commentButton);
    
    //New post is added to top of feed using prepend add before other posts)
    postFeed.prepend(postDiv);
}

// Toggle like functionality (changing appearance of icon when clicked)
function toggleLike(button) {
    // Looks for heart icon inside button clicked
    const heart = button.querySelector('.heart');
    //Adds or removes the 'liked' class, keeps track of whether post has been liked or not 
    button.classList.toggle('liked'); 

    // Change heart color based on the 'liked' class
    if (button.classList.contains('liked')) {
        heart.style.color = 'red'; // Change heart color to red
    } else {
        heart.style.color = '#ccc'; // Change heart color back to default grey
    }
}
// Makes function available globally so that they can be called from HTML
window.toggleLike = toggleLike;

// Shows a pop-up alert when comment button is clicked
function commentPost(button) {
    alert("Comment functionality not implemented yet.");
}

// Switches between save and saved icons
function savePost(button) {
    const img = button.querySelector('img'); // Get the img element inside the button
    if (img.src.includes('icons/save_icon.svg')) {
        img.src = 'icons/saved-icon.svg'; // Change to saved icon
    } else {
        img.src = 'icons/save_icon.svg'; // Change back to save icon
    }
}

// Makes function available globally so that they can be called from HTML
window.savePost = savePost;

// Slideshow on insights and recommendations page
class Slideshow {
    // Part that runs when a new slideshow is created. Takes container as input which is the HTML element that holds the slideshow.
    constructor(slideshowContainer) {
        // saves slideshow container so that the class can use it later
      this.slideshowContainer = slideshowContainer;
      // grabs all images inside container that have mySlides class. Each showing one at a time.
      this.slides = slideshowContainer.getElementsByClassName("mySlides");
      // Start by showing first slide
      this.slideIndex = 1;
      // Display first slide
      this.showSlides(this.slideIndex);
  
      // Attach event listeners for buttons one to move ahead and one to move back (from HTML)
      const prevButton = slideshowContainer.querySelector('.new-prev');
      const nextButton = slideshowContainer.querySelector('.new-next');
  
      // If buttons are found, attaches a click event listener to them to run a function when user clicks
      if (prevButton) {
        prevButton.addEventListener('click', () => this.plusSlides(-1));
      }
  
      if (nextButton) {
        nextButton.addEventListener('click', () => this.plusSlides(1));
      }
    }
  
    // Updates current slide index and calls showSlides to display correct slide.
    plusSlides(n) {
        // Modifies slideIndex by adding (or subtracting) value of n. 
        // n is 1, moves to next slide. n is -1, moves to previous slide.
      this.showSlides(this.slideIndex += n);
    }
  
    // Displays whatever n is, ex. if n is 3, shows third slide
    // Used for when user clicks on dots instead
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    }
  
    showSlides(n) {
        // If user tries to go past last slide, loops back to first
      if (n > this.slides.length) { this.slideIndex = 1; }
      // If user tries to go back before first slide, loops to the last 
      if (n < 1) { this.slideIndex = this.slides.length; }
  
      // Hide all slides
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none";
      }
  
      // Show the current slide
      this.slides[this.slideIndex - 1].style.display = "block";
    }
  }
  
  // Initialize both slideshows
  // Grabs all elements with new-slideshow-container class
  const firstSlideshow = document.querySelectorAll('.new-slideshow-container')[0];
  const secondSlideshow = document.querySelectorAll('.new-slideshow-container')[1];
  // new Slideshow(first/second) creates a new slideshow for each contianer to make two seperate ones on the same page.
  const slideshow1 = new Slideshow(firstSlideshow);
  const slideshow2 = new Slideshow(secondSlideshow);
  



