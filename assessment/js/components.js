// Constants for API interaction
const studentNumber = "s4889410";
const uqcloudZoneId = "99ad41a3";
const headers = new Headers();
headers.append("student_number", studentNumber);
headers.append("uqcloud_zone_id", uqcloudZoneId);

// API Functions
export function submitEventForm(formData, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST',
        headers: headers,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error response:', err);
                throw new Error(err.detail || 'Something went wrong');
            });
        }
        return response.json();
    })
    .then(result => {
        console.log('Event created:', result);
        handleSuccess(result);
    })
    .catch(error => {
        console.error('Error:', error.message);
        handleError(error);
    });
}

export function fetchEvents(displayEvents, handleGetError) {
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", {
        method: "GET",
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayEvents(data);
    })
    .catch(error => {
        handleGetError(error);
    });
}

// Wait for DOM to be fully loaded before adding event listeners
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

    // Section toggle functionality
    // function toggleSection(sectionId) {
    //     const section = document.getElementById(sectionId);
    //     if (!section) return;
        
    //     const items = section.querySelectorAll('.item');
    //     const seeMoreToggle = section.querySelector('.see-more');
        
    //     if (items.length > 0) {
    //         const isExpanded = Array.from(items).slice(3).some(item => !item.classList.contains('hidden'));
            
    //         items.forEach((item, index) => {
    //             if (index >= 3) {
    //                 if (isExpanded) {
    //                     item.classList.add('hidden');
    //                 } else {
    //                     item.classList.remove('hidden');
    //                 }
    //             }
    //         });
            
    //         if (seeMoreToggle) {
    //             const textElement = seeMoreToggle.querySelector('p') || seeMoreToggle.firstChild;
    //             const arrowElement = seeMoreToggle.querySelector('.arrow');
                
    //             if (textElement) {
    //                 textElement.textContent = isExpanded ? 'See more' : 'See less';
    //             }
    //             if (arrowElement) {
    //                 arrowElement.textContent = isExpanded ? '⌄' : '▲';
    //             }
    //         }
    //     }
    // }
    
    // Initialize sections when DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Initialize sections with only 3 items visible
        const sections = ['todo-section', 'food-drink-section', 'accommodations-section', 'visa-section'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                // Hide items after the first three
                const items = section.querySelectorAll('.item');
                items.forEach((item, index) => {
                    if (index >= 3) {
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


document.addEventListener("DOMContentLoaded", () => {
    // Modal elements
    const modal = document.getElementById("eventModal");
    const modalTitle = document.getElementById("eventTitle");
    const modalDescription = document.getElementById("eventDescription");
    const modalHost = document.getElementById("eventHost");
    const modalDate = document.getElementById("eventDate");
    const closeModal = document.getElementsByClassName("close")[0];

    // Function to show modal with specific content
    function openModal(title, description, host, date) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalHost.textContent = `Host: ${host}`;
        modalDate.textContent = `Date: ${date}`;
        modal.style.display = "block";
    }

    // Close the modal
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Click outside of modal to close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Event listeners for each image
    const images = document.querySelectorAll(".image-container");
    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            let eventInfo;
            switch (index) {
                case 0:
                    eventInfo = {
                        title: "Carnival",
                        description: "Enjoy the festivities of Carnival with parades, music, and dance! Visit our site to book now!",
                        host: "Rio City Council",
                        date: "February 12, 2025"
                    };
                    break;
                case 1:
                    eventInfo = {
                        title: "DJ Night",
                        description: "Dance the night away with our amazing DJs spinning the best tracks. Book your tickets now!",
                        host: "XYZ Club",
                        date: "March 5, 2025"
                    };
                    break;
                case 2:
                    eventInfo = {
                        title: "Music Festival",
                        description: "Join us for a day of live music from various artists. Head to our site to reserve your seats.",
                        host: "BrazilFests",
                        date: "April 15, 2025"
                    };
                    break;
                case 3:
                    eventInfo = {
                        title: "Night Club",
                        description: "Experience the vibrant nightlife at our top-rated night club. Tickets on sale now!",
                        host: "Nightlife Rio",
                        date: "May 20, 2025"
                    };
                    break;
                default:
                    eventInfo = {
                        title: "Event",
                        description: "Event details are available.",
                        host: "Unknown",
                        date: "TBA"
                    };
            }
            openModal(eventInfo.title, eventInfo.description, eventInfo.host, eventInfo.date);
        });
    });
});

  
// Modal for events page slideshows
document.addEventListener('DOMContentLoaded', function() {
    // Automatically initialize all slideshow containers
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    slideshowContainers.forEach(container => new Slideshow(container));

    const modal = document.getElementById("modal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDetails = modal.querySelector(".modal-description");
    const modalHost = modal.querySelector(".modal-host");
    const modalDate = modal.querySelector(".modal-date");

    // Function to open modal with data
    function openModal(imageContainer) {
        const title = imageContainer.querySelector("h2").textContent;
        const description = imageContainer.querySelector("p").textContent;
        const host = imageContainer.getAttribute("data-host");  // Get host from data attribute
        const date = imageContainer.getAttribute("data-date");  // Get date from data attribute

        modalTitle.textContent = title;
        modalDetails.textContent = description;
        modalHost.textContent = `Host: ${host}`;  // Display host
        modalDate.textContent = `Date: ${date}`;  // Display date

        modal.style.display = "block";
    }

    // Close modal when 'X' is clicked
    document.querySelector(".close").onclick = function() {
        modal.style.display = "none";
    };

    // Set up click listeners on each image container
    document.querySelectorAll('.new-image-container').forEach(container => {
        container.addEventListener("click", () => {
            openModal(container);
        });
    });

    // Close modal when clicking outside the content area
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});


// Modal functionality for items in Insights and Recommendations page
document.addEventListener('DOMContentLoaded', function() {
    // Get the correct modal elements from insights_recommendations.html
    const modal = document.getElementById("insightsModal");
    const modalClose = document.getElementById("insightsModalClose");
    const modalTitle = modal?.querySelector("#insightsModalTitle");
    
    // Function to open the modal with data
    function openModal(container) {
        if (!modal || !modalTitle) return;
        
        // Get info from the clicked item
        const title = container.querySelector(".info h3")?.textContent;
        const content = container.querySelector(".info")?.innerHTML;
        
        modalTitle.textContent = title;
        // Add a new div for content if needed
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
            // Clear existing content except close button and title
            const contentDiv = modalContent.querySelector(".modal-body") || document.createElement("div");
            contentDiv.className = "modal-body";
            contentDiv.innerHTML = content;
            
            // Only append if it's not already there
            if (!modalContent.querySelector(".modal-body")) {
                modalContent.appendChild(contentDiv);
            }
        }
        
        modal.style.display = "block";
    }
    
    // Add click listeners to all gallery items
    const galleryItems = document.querySelectorAll('.gallery .item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });
    
    // Close button functionality
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }
    
    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});



// Notifications View More Pop-up error button

document.addEventListener('DOMContentLoaded', () => {
    const notificationsButton = document.getElementById('notificationButton');
    const notificationsPopup = document.getElementById('communityNotificationsPopup');
    const closePopup = document.getElementById('closeCommunityNotificationsPopup');
    const viewButtons = document.querySelectorAll('.view-button'); // Get all view buttons

    // Show notifications popup
    if (notificationsButton) {
        notificationsButton.addEventListener('click', () => {
            notificationsPopup.style.display = 'block';
        });
    }

    // Close notifications popup
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            notificationsPopup.style.display = 'none';
        });
    }

    // Close notifications popup when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === notificationsPopup) {
            notificationsPopup.style.display = 'none';
        }
    });

    // Show the alert when a view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor action
            alert("This functionality has not been implemented yet."); // Show the default popup
        });
    });
});

// Search bar reload on safety guides page
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("keypress", (event) => {
        // Check if the Enter key (key code 13) is pressed
        if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action (optional)
        // Reload the page
        location.reload();
        }
    });
});


// Search bar reload on community page
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = this.value;
        // Redirect to the same page with the query as a URL parameter
        window.location.href = `community.html?search=${encodeURIComponent(query)}`;
    }
});