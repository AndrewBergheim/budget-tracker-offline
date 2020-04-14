    // add event listener for first-time caching

    self.addEventListener("install", function(event){
        event.waitUntil(
            caches.open("budgetCache").then(function(cache){
                return cache.addAll([
                    "./index.html",
                    "./index.js",
                    "./styles.css"
                ])
            })
        )
    })
/*
    //event listener for fetch requests
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            // if this next bit fails (if the user is offline) it will attempt to grab the correct resource from the cache
          fetch(event.request).catch(function() {
            return caches.match(event.request);
          })
        );
      });

    //database event listeners

    */

   self.addEventListener('fetch', function(event) {
    console.log("sw init")
    event.respondWith(
      caches.open('budgetCache').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });