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


const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  // Toggle the 'active' class on the off-screen menu
  offScreenMenu.classList.toggle("active");
  // Toggle the 'active' class on the hamburger menu for animation
  hamMenu.classList.toggle("active");
});

// Keep your existing code for scrolling
window.onload = function () {
  window.addEventListener('scroll', function (e) {
      if (window.pageYOffset > 100) {
          document.querySelector("header").classList.add('is-scrolling');
      } else {
          document.querySelector("header").classList.remove('is-scrolling');
      }
  });

  const menu_btn = document.querySelector('.hamburger');
  if (!menu_btn) {
      console.error("Hamburger button not found");
  } else {
      console.log("Hamburger button found");
  }
  
  const nav_links = document.querySelector('.nav-links');

  menu_btn.addEventListener('click', function () {
      console.log("Hamburger clicked"); // Check if this logs

      menu_btn.classList.toggle('is-active');
      nav_links.classList.toggle('active');
  });
};
