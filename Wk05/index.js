console.log('Hello, world!');

let express = require('express');
console.log(express);

let app = express();   
console.log(app);

app.get('/', function(request, response) {
    console.log(request); 
    response.send('This is the homepage');
});   

app.get('/about', function(request, response) {
    console.log(request); 
    response.send('This is the about page yo');
});  

 

app.listen(3000, function() {
    console.log('Server is running on port 3000');
}); 