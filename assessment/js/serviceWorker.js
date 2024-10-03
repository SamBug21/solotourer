/**
 * All of this JS code is to make sure that the pages are available even if there is no network connection
 * We can specify pages now - at the 'Add any critical files you want cached immediately' point
 * But we have added JS that will do this automatically for use as people open pages
 * This is a better approach so that only the pages that the user is interested in will be pre-loaded.
 */

// Name of the cache 
const CACHE_NAME = 'my-DECO7140-cache-v1';

// List of URL'S to pre-cache (optional, only the essential ones) when the service worker is installed.
const urlsToPreCache = [
  '/',  // Cache the home page
  '/index.html',  // Main page
  // Add any critical files you want cached immediately
];

// Install event - pre-cache only essential files
// when the service worker (self) is installed (listens for the service worker's installation event), set up an event listener for the install event
// "listens" for a specific event to occur on a web page, then runs associated function
self.addEventListener('install', (event) => {
  //service worker should wait until caching process is complete before finishing installation.
  event.waitUntil(
    //opens the cache defined by CACHE_NAME, if cache exists, the existing cache will be opened.
    caches.open(CACHE_NAME).then((cache) => {
      //cache has been successfully opened.
      console.log('Opened cache');
      //adds all the specified URLs to the cache
      return cache.addAll(urlsToPreCache);
    })
  );
});

// Activate event - clean up old caches if necessary
// After service worker is installed, sets up an event listener for the activate event
self.addEventListener('activate', (event) => {
  // define cacheWhitelist containing the name of cache you want(CACHE_NAME)
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    // Retrieves all existing cache name
    caches.keys().then((cacheNames) => {
      //Waits for all cache deletions to complete.
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If cache name is not in the whitelist, it is deleted.
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content and dynamically cache new content
// Sets up an event listener for fetch requests made by the web page.
self.addEventListener('fetch', (event) => {
  // Tells the service worker how to respond to the fetch request.
  event.respondWith(
    // Checks if the requested resource is in the cache.
    caches.match(event.request).then((response) => {
      // Serve the cached response if found
      if (response) {
        return response;
      }

      // Clone the request to fetch and cache the new file
      // If the resource is not found in the cache, the service worker makes a network request to fetch it.
      // Use one copy to send fetch request and the other to cache resource. Ensures both operations occurs without conflict or error.
      const fetchRequest = event.request.clone();
      
      // Only cache valid HTTP/HTTPS requests
      if (event.request.url.startsWith('http')) {
        // The call to fetch sends the request defined in fetchRequest to the server then handle the response returned by the server.
        return fetch(fetchRequest).then((response) => {
          // If the response is valid (status 200 and of type basic), cache it dynamically, otherwise, response will not be cached.
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Create a clone of the response for caching.
          const responseToCache = response.clone();
          
          // Opens the specified cache (defined earlier)
          caches.open(CACHE_NAME).then((cache) => {
            // Store cache in response.
            // Adds the cloned response to the cache.
            // Takes original request (event.request) and the cloned response.
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      } else {
        // For unsupported schemes like 'chrome-extension://', just fetch without caching
        return fetch(event.request);
      }
    })
  );
});

