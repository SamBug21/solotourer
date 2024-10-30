// Constants for API interaction
// components.js

// Using these values to identify yourself and the zone where your data is stored when interacting with the API 
const studentNumber = "s4889410";
const uqcloudZoneId = "99ad41a3";

// Create headers object once as a constant that will store key value pairs to send to server 
const headers = new Headers();
// Adds header with key student_number and uqcloud_zone_id and values from both
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

// Function to submit the event form - THE POST request
// export makes it available to other JS files
export function submitEventForm(formData, handleSuccess, handleError) { // formData : holds data from form, handleSuccess and Error tells function to run if successful or error
    // Sending post request to the URL
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST', // Wants to send data
        headers: headers, // Sends headers (student number and cloud zone id)
        body: formData // Sends form data to server
    })

    // Wait for server response
    .then(response => {
        // If server responds error, run this
        if (!response.ok) {
            // convert response from JSON to Javascript
            return response.json().then(err => {
                // Logs server error message
                console.error('Server error response:', err);
                throw new Error(err.detail || 'Something went wrong');
            });
        }
        return response.json(); // Return the response as JSON
    })
    // if successful however, run this
    .then(result => {
        // Logs result (server's confirmation)
        console.log('Event created:', result);
        // calls success handler, passing created event
        handleSuccess(result);
    })

    // If network issue, log error to console and call error handler
    .catch(error => {
        console.error('Error:', error.message); // Log detailed error
        handleError(error); // Call the error handler
    });
}

// Function to fetch events from the API - GET request to URL to retrieve data
// Do function based on success or error 
export function fetchEvents(displayEvents, handleGetError) {
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", {
        method: "GET",
        headers: headers, // Sends headers (student number and zone ID)
    })
    .then(response => {
        // If response is not okay, throw error)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Convert JSON response
        return response.json();
    })

    // if successful, call displayEvents(data) to show events on page.
    .then(data => {
        displayEvents(data); // Call the success handler
    })

    // If error, call error handler and pass error 
    .catch(error => {
        handleGetError(error); // Call the error handler
    });
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