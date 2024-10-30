// Debug helper
console.log("JavaScript file loaded");

// Debug helper
console.log("JavaScript file loaded");

// Slideshow functionality
class Slideshow {
    constructor(container) {
        this.container = container;
        this.slideIndex = 1;
        this.slides = this.container.querySelectorAll('.mySlides');
        this.showSlides(this.slideIndex);

        // Bind next and prev buttons within the container
        const nextButton = this.container.querySelector('.next');
        const prevButton = this.container.querySelector('.prev');
        if (nextButton) nextButton.onclick = () => this.plusSlides(1);
        if (prevButton) prevButton.onclick = () => this.plusSlides(-1);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        if (!this.slides.length) return;

        if (n > this.slides.length) { this.slideIndex = 1; }
        if (n < 1) { this.slideIndex = this.slides.length; }

        this.slides.forEach(slide => slide.style.display = "none");
        this.slides[this.slideIndex - 1].style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Automatically initialize all slideshow containers
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    slideshowContainers.forEach(container => new Slideshow(container));

    // Optional: For pages that need direct access to specific slideshows, such as Events page
    const eventsPageSlideshows = [
        document.querySelector('.slideshow1'),
        document.querySelector('.slideshow2'),
        document.querySelector('.slideshow3'),
        document.querySelector('.slideshow4')
    ];

    // Initialize and assign them to global variables for direct access if they exist
    eventsPageSlideshows.forEach((container, index) => {
        if (container) {
            window[`slideshow${index + 1}`] = new Slideshow(container);
        }
    });
});



// Carousel functionality
class Carousel {
    constructor(carouselClass) {
        this.currentIndex = 0;
        this.carouselClass = carouselClass;
        this.images = document.querySelectorAll(`.${carouselClass}-image`);
        this.initialize();
    }

    initialize() {
        this.showSlides();
    }

    showSlides() {
        if (!this.images.length) return;

        this.images.forEach((img, index) => {
            img.style.display = (index === this.currentIndex) ? 'block' : 'none';
        });

        const carousel = document.querySelector(`.${this.carouselClass}`);
        if (carousel) {
            const offset = -this.currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }
    }

    changeSlide(direction) {
        this.currentIndex += direction;

        if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        } else if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        }

        this.showSlides();
    }
}

// Post functionality
document.addEventListener('DOMContentLoaded', () => {
    // Instantiate the postForm class
    const postManager = new postForm();
});

class postForm {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.loadPosts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const postForm = document.getElementById('postForm');
        if (postForm) {
            postForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const postContent = document.getElementById('postContent')?.value;
                if (postContent) {
                    this.addPost(postContent, "Claire Williams", "./images/user_profile.jpg");
                    document.getElementById('postContent').value = '';
                }
            });
        }
    }

    loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            this.addPost(post.content, post.userName, post.userPic);
        });
    }

    addPost(content, userName, userPic) {
        const postFeed = document.getElementById('postFeed');
        if (!postFeed) return;

        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const saveButton = this.createSaveButton();
        const commentButton = this.createCommentButton();

        postDiv.innerHTML = `
            <div class="user-info">
                <img src="${userPic}" alt="${userName}'s profile picture">
                <strong>${userName}</strong>
            </div>
            <div class="post-content">${content}</div>
            <div class="post-actions">
                <button class="like-button" onclick="postManager.toggleLike(this)">
                    <span class="heart">&#10084;</span>
                </button>
            </div>
        `;

        const postActions = postDiv.querySelector('.post-actions');
        if (postActions) {
            postActions.appendChild(saveButton);
            postActions.appendChild(commentButton);
        }

        postFeed.prepend(postDiv);
    }

    createSaveButton() {
        const button = document.createElement('button');
        button.innerHTML = '<img src="icons/save_icon.svg" alt="Save" style="width: 20px; height: 20px;" />';
        button.addEventListener('click', () => this.savePost(button));
        return button;
    }

    createCommentButton() {
        const button = document.createElement('button');
        button.innerHTML = '<img src="icons/comment-icon.svg" alt="Comment" style="width: 25px; height: 25px;" />';
        button.addEventListener('click', () => this.commentPost(button));
        return button;
    }

    toggleLike(button) {
        const heart = button.querySelector('.heart');
        if (heart) {
            button.classList.toggle('liked');
            heart.style.color = button.classList.contains('liked') ? 'red' : '#ccc';
        }
    }

    commentPost() {
        alert("Comment functionality not implemented yet.");
    }

    savePost(button) {
        const img = button.querySelector('img');
        if (img) {
            img.src = img.src.includes('icons/save_icon.svg') ? 
                'icons/saved-icon.svg' : 
                'icons/save_icon.svg';
        }
    }
}

// Scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main slideshow
    const mainSlideshow = new Slideshow('mySlides');
    window.plusSlides = (n) => mainSlideshow.plusSlides(n);
    window.currentSlide = (n) => mainSlideshow.currentSlide(n);

    // Initialize carousel
    const mainCarousel = new Carousel('carousel');
    window.changeSlide = (direction) => mainCarousel.changeSlide(direction);

    // Initialize post manager
    window.postManager = new PostManager();

    // Make scroll function global
    window.scrollToSection = scrollToSection;
});