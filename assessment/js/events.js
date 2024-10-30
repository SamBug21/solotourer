import { submitEventForm, fetchEvents } from './components.js';

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load existing events
    loadEvents();

    // Add event listener for form submission
    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        eventForm.addEventListener("submit", handleFormSubmission);
    }
});

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    // Create FormData object from the form
    const formData = new FormData(event.target);
    
    // Handle file upload if present
    const fileInput = document.getElementById('genericevent_photo');
    if (fileInput && fileInput.files[0]) {
        formData.append('genericevent_photo', fileInput.files[0]);
    }

    // Format the date-time
    const dateTimeInput = document.getElementById('date_time').value;
    if (dateTimeInput) {
        const date = new Date(dateTimeInput);
        const formattedDateTime = formatDateForAPI(date);
        formData.set('date_time', formattedDateTime);
    }

    // Submit the form data
    submitEventForm(formData, handleSuccess, handleError);
}

// Success handler for form submission
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    if (messageDiv) {
        messageDiv.textContent = `Thanks! ${result.event_name} was posted! Head to the Event Page to see it posted.`;
        messageDiv.style.color = "green";
    }
    
    // Reset form and reload events
    const form = document.getElementById('eventForm');
    if (form) {
        form.reset();
    }
    loadEvents();
}

// Error handler for form submission
function handleError(error) {
    const messageDiv = document.getElementById('submitResponse');
    if (messageDiv) {
        messageDiv.textContent = "There was a problem. Please try again.";
        messageDiv.style.color = "red";
    }
    console.error('Submission error:', error);
}

// Load events from API
function loadEvents() {
    fetchEvents(displayEvents, handleGetError);
}

// Display fetched events
function displayEvents(data) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    data.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.insertAdjacentHTML('beforeend', eventCard);
    });
}

// Create HTML for event card
function createEventCard(event) {
    const formattedDateTime = formatDateForDisplay(event.date_time);
    const eventImage = event.genericevent_photo || "./images/noun-event-6998746.png";

    return `
        <div class="event-card" role="article" aria-labelledby="event-${event.id}-name">
            <div class="event-card-header">
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
}

// Format date for API submission
function formatDateForAPI(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Format date for display
function formatDateForDisplay(dateTime) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
}

// Handle API fetch errors
function handleGetError(error) {
    console.error('Error fetching events:', error);
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        eventsContainer.innerHTML = '<p class="error">Failed to load events. Please try again later.</p>';
    }
}