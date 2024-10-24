console.log("This is the client side code");    

window.addEventListener('load', function() {
    fetch('/data')
    .then(function(response) {
        return response.json();
    }