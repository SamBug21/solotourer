// components.js

// Constants
const studentNumber = "s4889410";
const uqcloudZoneId = "99ad41a3";

// Create headers once as a constant
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

// Function to submit the event form
export function submitEventForm(formData, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST',
        headers: headers, // Use headers if needed
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error response:', err); // For debugging
                throw new Error(err.detail || 'Something went wrong');
            });
        }
        return response.json(); // Return the response as JSON
    })
    .then(result => {
        console.log('Event created:', result);
        handleSuccess(result); // Call the success handler
    })
    .catch(error => {
        console.error('Error:', error.message); // Log detailed error
        handleError(error); // Call the error handler
    });
}

// Function to fetch events from the API
export function fetchEvents(displayEvents, handleGetError) {
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", {
        method: "GET",
        headers: headers, // Use the predefined headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        displayEvents(data); // Call the success handler
    })
    .catch(error => {
        handleGetError(error); // Call the error handler
    });
}
