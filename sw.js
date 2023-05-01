self.addEventListener('fetch', function (event) {
    // Log the URL of the request
    console.log('Request URL: ', event.request.url);

    // Check if the request is for Google Analytics
    if (event.request.url.indexOf('www.googletagmanager.com/gtag/js') === 0) {
        // Clone the request
        var request = event.request.clone();

        // Fetch the Google Analytics script
        event.respondWith(
            fetch(request).then(function (response) {
                // Clone the response
                var responseToCache = response.clone();

                // Open the cache
                caches.open('google-analytics').then(function (cache) {
                    // Put the response in the cache
                    cache.put(event.request, responseToCache);
                });

                // Return the response
                return response;
            }).catch(function () {
                // If the request fails, return the response from the cache
                return caches.match(event.request);
            })
        );
    } else if (event.request.url.indexOf('consent.cookiebot.com/uc.js') === 0) {
        // Clone the request
        var request = event.request.clone();

        // Fetch the Cookiebot cookie consent script
        event.respondWith(
            fetch(request).then(function (response) {
                // Clone the response
                var responseToCache = response.clone();

                // Open the cache
                caches.open('cookiebot').then(function (cache) {
                    // Put the response in the cache
                    cache.put(event.request, responseToCache);
                });

                // Return the response
                return response;
            }).catch(function () {
                // If the request fails, return the response from the cache
                return caches.match(event.request);
            })
        );
    }
});
