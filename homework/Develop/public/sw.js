    // add event listener for first-time caching

    self.addEventListener("install", function(event){
      event.waitUntil(
          caches.open("budgetCache").then(function(cache){
              return cache.addAll([
                "./api/transaction",
                "/",
                  "./index.html",
                  "./index.js",
                  "./styles.css",
                  "./sw.js"
              ])
          })
      )
  })

  //event listener for fetch requests
  self.addEventListener('fetch', function(event) {
      event.respondWith(
          // if this next bit fails (if the user is offline) it will attempt to grab the correct resource from the cache
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });