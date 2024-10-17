import { submitEventForm, fetchEvents } from './components.js'; // Import only what you need

// Fetch events when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();  

    // Add the event listener for the form submission
    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        eventForm.addEventListener("submit", function(event) {
            event.preventDefault();  // Prevent the default form submission

            // Prepare FormData for API submission
            const formData = new FormData(event.target);
            const fileInput = document.getElementById('genericevent_photo');
            const file = fileInput ? fileInput.files[0] : null;  // Get uploaded file

            if (file) {
                formData.append('genericevent_photo', file);  // Append the file to the formData
            }

            // Optionally, reset the form after submission
            eventForm.reset();

            // Submit the event data to the API
            submitEventForm(formData, handleSuccess, handleError); // Send the form data via POST
        });
    }
});

// Success handler for the form submission
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = `Thanks! ${result.event_name} was posted! Head to the Event's page to check it out!`; // Use backticks for template literals
    messageDiv.style.color = "green";
    loadEvents();  // Reload events to include the new one
}

// Error handler for the form submission
function handleError(error) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = "There was a problem. Please try again.";
    messageDiv.style.color = "red";
}

// Function to fetch events via GET request
function loadEvents() {
    fetchEvents(displayEvents, handleGetError);  // Fetch the events
}

// Function to display the fetched events in the events container
function displayEvents(data) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = "";  // Clear previous events

    data.forEach(event => {
        const formattedDateTime = formatDateTime(event.date_time);  // Format date-time
        const eventImage = event.genericevent_photo ? event.genericevent_photo : "./images/noun-event-6998746.png";  // Use default image if none provided

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
        eventsContainer.innerHTML += eventCard;  // Add the new card to the container
    });
}

// Function to handle errors during fetching
function handleGetError(error) {
    console.error('Error fetching events:', error);
}

// Helper function to format date-time
function formatDateTime(dateTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
}
