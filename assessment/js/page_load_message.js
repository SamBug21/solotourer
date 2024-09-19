
// variables

// module code
// page_load_message.js

// Define the module
// page_load_message.js

// Define the module
const PageLoadMessage = (() => {
    const message = "Page loaded successfully!";

    const displayMessage = () => {
        console.log(message); // Log message to the console

        const messageContainer = document.createElement('div');
        messageContainer.textContent = message;
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '10px';
        messageContainer.style.right = '10px';
        messageContainer.style.backgroundColor = 'lightgreen';
        messageContainer.style.padding = '10px';
        messageContainer.style.borderRadius = '5px';
        document.body.appendChild(messageContainer);

        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    };

    return {
        show: displayMessage
    };
})();

// Event listener for page load
window.addEventListener('load', PageLoadMessage.show);

// Export the module
export { PageLoadMessage };


// module exports