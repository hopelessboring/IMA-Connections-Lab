let express = require('express');
let app = express();
const data = require('./urbanLong.json');

// Accessing the JSON data
console.log(data);

app.use('/', express.static('public'));


app.get('/about', function(request, response) {
    console.log(request); 
    response.send('This is the about page. We have nothing to say though.');
})

app.get('/data', function(request, response) {
    response.json(data);
})

app.get('/data/:place', function(request, response) {
    console.log(request.params); 
    let requestedplace = request.params.place;
    let user_obj; 
    //console.log(data.placedata.length)
    for(let i = 0; i<data.placedata.length;i++) { 
        if(requestedplace == data.placedata[i].place) {
             user_obj = data.placedata[i];
         }
     }
    if(user_obj){
        // response.json(user_obj);
        // response.json('Thank you. You requested the city of ' + request.params.place);
        // response.send('It maches with ');
        response.json(user_obj);
        //response.json(user_obj);
    } else {
        response.json('City not found');
    }

})

// // Serve static files like HTML, CSS, and client-side JS from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// // API endpoint to send JSON data to the client
// app.get('/api/data', (req, res) => {
//     res.json(data);  // Sends the JSON file to the client
// });

app.get('/api/data', (req, res) => {
    res.json(data);  // Sends the JSON file to the client
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 