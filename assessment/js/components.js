// Constants for API interaction
const studentNumber = "s4889410";
const uqcloudZoneId = "99ad41a3";
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

// API Functions
export function submitEventForm(formData, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST',
        headers: headers,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error response:', err);
                throw new Error(err.detail || 'Something went wrong');
            });
        }
        return response.json();
    })
    .then(result => {
        console.log('Event created:', result);
        handleSuccess(result);
    })
    .catch(error => {
        console.error('Error:', error.message);
        handleError(error);
    });
}

export function fetchEvents(displayEvents, handleGetError) {
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", {
        method: "GET",
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayEvents(data);
    })
    .catch(error => {
        handleGetError(error);
    });
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Navigation menu functionality
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    
    if (hamMenu && offScreenMenu) {
        hamMenu.addEventListener("click", () => {
            offScreenMenu.classList.toggle("active");
            hamMenu.classList.toggle("active");
        });
    }

    // Scroll header functionality
    window.addEventListener('scroll', function() {
        const header = document.querySelector("header");
        if (header) {
            if (window.pageYOffset > 100) {
                header.classList.add('is-scrolling');
            } else {
                header.classList.remove('is-scrolling');
            }
        }
    });

    // Newsletter signup functionality
    const signupButton = document.querySelector('.signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', function() {
            localStorage.setItem('signupMessage', 'Thank you for signing up for this newsletter.');
            location.reload();
        });
    }

    // Display signup message if exists
    const signupMessage = localStorage.getItem('signupMessage');
    if (signupMessage) {
        const messageElement = document.getElementById('signupMessage');
        if (messageElement) {
            messageElement.innerText = signupMessage;
            messageElement.style.display = 'block';
            localStorage.removeItem('signupMessage');
        }
    }

    // Section toggle functionality
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const items = section.querySelectorAll('.item');
        const seeMoreToggle = section.querySelector('.see-more');
        
        if (items.length > 0) {
            const isExpanded = Array.from(items).slice(3).some(item => !item.classList.contains('hidden'));
            
            // Toggle visibility of items after the first three
            items.forEach((item, index) => {
                if (index >= 3) {
                    if (isExpanded) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                }
            });
            
            // Update the toggle button text and arrow
            if (seeMoreToggle) {
                const textElement = seeMoreToggle.querySelector('p') || seeMoreToggle.firstChild;
                const arrowElement = seeMoreToggle.querySelector('.arrow');
                
                if (textElement) {
                    textElement.textContent = isExpanded ? 'See more' : 'See less';
                }
                if (arrowElement) {
                    arrowElement.textContent = isExpanded ? '⌄' : '▲';
                }
            }
        }
    }
    
    // Initialize sections when DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Initialize sections with only 3 items visible
        const sections = ['todo-section', 'food-drink-section', 'accommodations-section', 'visa-section'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                // Hide items after the first three
                const items = section.querySelectorAll('.item');
                items.forEach((item, index) => {
                    if (index >= 3) {
                        item.classList.add('hidden');
                    }
                });
                
                // Add click event listeners to see more/less buttons
                const seeMoreToggle = section.querySelector('.see-more');
                if (seeMoreToggle) {
                    // Remove any existing onclick attribute
                    seeMoreToggle.removeAttribute('onclick');
                    // Add event listener
                    seeMoreToggle.addEventListener('click', () => toggleSection(sectionId));
                }
            }
        });
    });

    // Comments functionality
    window.toggleComments = function() {
        const commentsSection = document.getElementById("commentsSection");
        if (commentsSection) {
            commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
        }
    };

    window.replyPost = function(event, button) {
        event.preventDefault();
        alert("Reply functionality not implemented yet.");
    };
});