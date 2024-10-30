// Constants for API interaction
const studentNumber = "s4889410";
const uqcloudZoneId = "99ad41a3";
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

// API Functions
export function submitEventForm(formData, handleSuccess, handleError) {
    // ... [keep existing submitEventForm code]
}

export function fetchEvents(displayEvents, handleGetError) {
    // ... [keep existing fetchEvents code]
}

// Section toggle functionality - defined outside DOMContentLoaded
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const items = section.querySelectorAll('.item');
    const seeMoreToggle = section.querySelector('.see-more, #see-more-toggle');
    
    if (items.length > 0) {
        const isExpanded = Array.from(items).slice(4).some(item => !item.classList.contains('hidden'));
        
        // Toggle visibility of items after the first three
        items.forEach((item, index) => {
            if (index >= 4) {
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

// Single DOMContentLoaded event listener
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

    // Initialize sections
    const sections = ['todo-section', 'food-drink-section', 'accommodations-section', 'visa-section'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Hide items after the first three
            const items = section.querySelectorAll('.item');
            items.forEach((item, index) => {
                if (index >= 4) {
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