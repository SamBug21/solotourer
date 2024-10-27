// Imports two functions, submitEventForm and fetchEvents, from components.js file
import { submitEventForm, fetchEvents } from './components.js'; // Import only what you need

// Fetch events when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Fetches events and displays them, runs once page is loaded
    loadEvents();

    // Add the event listener for the form submission
    // Gets elements with id eventForm to eventForm variable
    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        // Event listener that waits for the form to be submitted
        eventForm.addEventListener("submit", function(event) {
            // Prevent the default form submission (page refresh)
            event.preventDefault();

            // Prepare FormData for API submission by creating FormData object (organises data from the form for submission)
            //event.target is the form that was submitted
            const formData = new FormData(event.target);
            // selects a file input element with the ID genericevent_photo
            const fileInput = document.getElementById('genericevent_photo');
            // Check if fileInput exists, Get first uploaded file or be null
            const file = fileInput ? fileInput.files[0] : null;

            if (file) {
                // Append the file to the formData object with genericevent_photo key
                formData.append('genericevent_photo', file);  
            }

            // Reset the form after submission, clears all fields in form so user can make another submission
            eventForm.reset();

            // Submit the event data to the API
            submitEventForm(formData, handleSuccess, handleError); // Send the form data via POST
        });
    }
});

// Success handler for the form submission for event making form
// handleSuccess takes result argument which is returned from server after the form is submitted
function handleSuccess(result) {
    // Finds HTML element with submitResponse ID (messages shown here) and stores in messageDIV
    const messageDiv = document.getElementById('submitResponse');
    //Updates messageDiv to thank user 
    messageDiv.textContent = `Thanks! ${result.event_name} was posted! Head to the Event's page to check it out!`; // Use backticks for template literals
    messageDiv.style.color = "green";
    // Reload events to include the new one
    loadEvents();
}

// Error handler for the form submission
// 'error' contains info about what went wrong
function handleError(error) {
    // Finds HTML element with submitResponse ID (messages shown here) and stores in messageDIV
    const messageDiv = document.getElementById('submitResponse');
    // Updates text of messageDiv to inform that there was a problem.
    messageDiv.textContent = "There was a problem. Please try again.";
    messageDiv.style.color = "red";
}

// Function to fetch list of events via GET request from server
function loadEvents() {
    // Calls fetchEvents function and passes two other functions to tell it what to do with fetched data or with error.
    fetchEvents(displayEvents, handleGetError);  // Fetch the events
}

// Display the fetched events in the events container, data is the list of events from server
function displayEvents(data) {
    // Finds HTML elements with ID events-container (where events are shown) and stores in eventsContainer.
    const eventsContainer = document.getElementById('events-container');
     // Clear previous events by setting eventsContainer to an empty string
    eventsContainer.innerHTML = ""; 

    // loop that goes through each item in the data (event) and calls code below
    data.forEach(event => {
        // To format date_time of event into a more user friendly format
        const formattedDateTime = formatDateTime(event.date_time);
        // Checks if image is there and if not, uses default
        const eventImage = event.genericevent_photo ? event.genericevent_photo : "./images/noun-event-6998746.png";  // Use default image if none provided

        // Block of html code for creating event card
        // Add event details in header section of event card
        const eventCard = `
            <div class="event-card" role="article" aria-labelledby="event-${event.id}-name">
                <div class="event-card-header">
                    <p class="event-type" id = "event-${event.id}-type">${event.event_type}</p>
                    <h3 class="event-name" id="event-${event.id}-name">${event.event_name}</h3>
                    <p class="event-date">${formattedDateTime}</p>
                </div>
                <div class="event-card-image">
                    <img src="${eventImage}" alt="${event.event_name}">
                </div>
                <div class="event-card-body">
                    <p class="event-description">${event.description}</p>
                    <p class="event-location">Location: ${event.location}</p>
                </div>
                <div class="event-card-footer">
                    <p class="event-organiser">Organised by: ${event.organiser}</p>
                </div>
            </div>
        `;
        // Appends newly created event card to eventsContainer so it shows on webpage
        eventsContainer.innerHTML += eventCard;  // Add the new card to the container
    });
}

// Function to handle errors during fetching
function handleGetError(error) {
    // Print error message to console 
    console.error('Error fetching events:', error);
}

// Helper function to format date-time
function formatDateTime(dateTime) {
    // Specifies how to display date and time, showing full month name and 2 digits for time
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    // dateTime becomes Date object and formats it based on user settings and previous code
    return new Date(dateTime).toLocaleDateString(undefined, options);
}
