
// variables

// module code
// page_load_message.js

// Define the module
// page_load_message.js

// Define the module (new constant variable named PageLoadMessage) + function that runs as soon as it's defined (private)
const PageLoadMessage = (() => {
    // message we want to log when the page loads
    const message = "Page loaded successfully!";
    // function called displayMessage
    const displayMessage = () => {
        //  print/ log the message to the console
        console.log(message);
    };

    return {
        // execute the displayMessage function and log the message.
        show: displayMessage
    };
})();

// Event listener for page load
// When page loads, call show function from PageLoadMessage module, which calls displayMessage() and logs message to console.
window.addEventListener('load', PageLoadMessage.show);
// Export the module, allows other JS files to import and use the PageLoadMessage module
export { PageLoadMessage };


// module exports