// Constants

const studentNumber = "s4889410"
const uqcloudZoneId = "99ad41a3"

// Create headers once as a constant
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);


//Fetch request function for creating a new event
function submitEventForm(formData, headers, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/', {
        method: 'POST',
        headers: headers,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error response:', err); //for debugging
                throw new Error(err.detail || 'Something went wrong');
            });
        }
        return response.json(); //If success, return the response as JSON
    })
    .then (result => {
        console.log('Event created:', result);
        handleSuccess(result); //Call the success handler
    })
    .catch(error => {
        console.error('Error:', error.message); //Log detailed error
        handleError(error); //Call the error handler
    });
}

export { logPageLoadMessage, submitEventForm, studentNumber, uqcloudZoneId, headers };